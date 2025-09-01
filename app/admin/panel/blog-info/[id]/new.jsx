const handleSave = async () => {
    try {
        setSaving(true);
        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        let res;

        if (isNew) {
            // 🔹 Create a blog with defaults
            res = await fetch(`/api/blogs`, {
                method: "POST",
                headers,
                body: JSON.stringify(emptyBlog),
            });
        } else {
            // 🔹 Update blog
            res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(blog),
            });
        }

        const data = await res.json();

        if (!res.ok) {
            if (res.status === 400 && data.errors) {
                // Validation errors
                setMessage({
                    open: true,
                    title: "Validation Errors",
                    message: Object.entries(data.errors)
                        .map(([field, msg]) => `${field}: ${msg}`)
                        .join("\n"),
                });
            } else {
                // Other error
                setMessage({
                    open: true,
                    title: "Error",
                    message: data.message || "Failed to save blog ❌",
                });
            }
            return;
        }

        // ✅ Success
        if (isNew) {
            router.push(`/admin/panel/blog-info/${data._id}`);
        } else {
            setMessage({
                open: true,
                title: "Success",
                message: "Blog updated successfully ✅",
            });
        }
    } catch (err) {
        console.error("Error saving blog:", err);
        setMessage({
            open: true,
            title: "Error",
            message: "Something went wrong ❌",
        });
    } finally {
        setSaving(false);
    }
};
