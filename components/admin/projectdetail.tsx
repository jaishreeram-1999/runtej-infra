'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ProjectDetail() {
    const [form, setForm] = useState<any>({});
    const [imagePreview, setImagePreview] = useState('');
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchProjects = async () => {
        const res = await fetch('/api/project');
        const data = await res.json();
        setProjects(data);
    };

    const fetchCategories = async () => {
        const res = await fetch('/api/category');
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchProjects();
        fetchCategories();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setForm((prev: any) => ({ ...prev, imageUrl: url }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const url = editingId ? `/api/project/${editingId}` : '/api/project';
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                floor: Number(form.floor),
                yearOfCompletion: Number(form.yearOfCompletion)
            })
        });

        if (res.ok) {
            toast.success(`Project ${editingId ? 'updated' : 'added'} successfully`);
            setForm({});
            setImagePreview('');
            setEditingId(null);
            fetchProjects();
        } else {
            toast.error('Error saving project');
        }
    };

    const handleEdit = (project: any) => {
        setForm(project);
        setImagePreview(project.imageUrl);
        setEditingId(project._id);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this project?')) {
            const res = await fetch(`/api/project/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Project deleted');
                fetchProjects();
            } else {
                toast.error('Failed to delete');
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
            {/* Form Card */}
            <Card className="shadow-md">
                <CardContent className="p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Project Image</Label>
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && (
                                <Image
                                    src={imagePreview}
                                    alt="preview"
                                    width={250}
                                    height={150}
                                    className="rounded border mt-2"
                                />
                            )}
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Name" name="name" value={form.name || ''} onChange={handleChange} />
                            <InputField label="Address" name="address" value={form.address || ''} onChange={handleChange} />
                            <InputField label="Mixed Use Project Type" name="mixedUseProjectType" value={form.mixedUseProjectType || ''} onChange={handleChange} />
                            <InputField label="Floor" name="floor" type="number" value={form.floor || ''} onChange={handleChange} />
                            <InputField label="Sample Unit" name="sampleUnit" value={form.sampleUnit || ''} onChange={handleChange} />
                            <InputField label="Basement" name="basement" value={form.basement || ''} onChange={handleChange} />
                            <InputField label="Total Built-Up Area" name="totalBuiltUpArea" value={form.totalBuiltUpArea || ''} onChange={handleChange} />
                            <InputField label="Year of Completion" name="yearOfCompletion" type="number" value={form.yearOfCompletion || ''} onChange={handleChange} />
                        </div>

                        {/* TextAreas */}
                        <TextAreaField label="Description" name="description" value={form.description || ''} onChange={handleChange} />
                        <TextAreaField label="Overview" name="overview" value={form.overview || ''} onChange={handleChange} />

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                name="category"
                                value={form.category || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button type="submit">{editingId ? 'Update' : 'Add'} Project</Button>
                            {editingId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setForm({});
                                        setEditingId(null);
                                        setImagePreview('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Projects Listing */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">All Projects</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projects.map((proj: any) => (
                        <Card key={proj._id} className="shadow-sm">
                            <CardContent className="p-4 space-y-2">
                                <div className="font-semibold text-lg">{proj.name}</div>
                                <div className="text-muted-foreground text-sm">{proj.address}</div>
                                <div className="text-sm mt-1">Category: <strong>{proj.category?.name}</strong></div>
                                <div className="flex gap-2 mt-3">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(proj)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(proj._id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    );
}

function InputField({ label, ...props }: any) {
    return (
        <div>
            <Label>{label}</Label>
            <Input {...props} />
        </div>
    );
}

function TextAreaField({ label, ...props }: any) {
    return (
        <div>
            <Label>{label}</Label>
            <Textarea {...props} />
        </div>
    );
}
