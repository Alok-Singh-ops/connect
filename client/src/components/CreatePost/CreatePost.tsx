import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CreatePost() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Loading state to prevent double submission
  const [error, setError] = useState<string | null>(null); // Error state

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!caption || !file) {
      setError("Both caption and file are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Reset the form after successful submission
      setCaption("");
      setFile(null);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {/* Caption input */}
          <div className="flex-1 space-y-1">
            <label htmlFor="caption" className="text-sm font-medium leading-none">
              Caption
            </label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter your caption"
              required
            />
          </div>

          {/* File input */}
          <div className="flex-1 space-y-1">
            <label htmlFor="file" className="text-sm font-medium leading-none">
              Upload a file
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*" // Accept only image files; change as needed
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
