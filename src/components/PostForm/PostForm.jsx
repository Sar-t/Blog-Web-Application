import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../Index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        author: post?.author || "unknown",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submitHandler = async (data) => {
    if (post) {
      // console.log("Updating post:", data);
      const file = data.featuredimage[0]
        ? await service.uploadFile(data.featuredimage[0])
        : null;
        // console.log("File uploaded:", file);
      if (file) {
        service.deleteFile(post.featuredimage);
        // console.log("Old file deleted:", post.featuredimage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : post.featuredimage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.featuredimage[0]);
      // console.log("File uploaded:", file);
      if (file) {
        // console.log("File ID:", file.$id);
        const fileId = file.$id;
        data.featuredimage = fileId;
        data.Author = userData.name;
        // console.log("Data with file ID:", data);
        // console.log("User ID:", userData.$id);
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          alert("Post created!");
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .substring(0,36);

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Left Section (Title, Slug, Content) */}
      <div className="md:col-span-2 space-y-5">
        <Input
          label="Title"
          placeholder="Enter post title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Auto-generated or edit manually"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
          disabled
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section (Image, Status, Button) */}
      <div className="space-y-5">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif image/webp"
          {...register("featuredimage", { required: !post })}
        />
        {post && (
          <div className="w-full h-auto rounded-lg overflow-hidden">
            <img
              src={service.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full object-cover rounded-lg shadow-sm"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
