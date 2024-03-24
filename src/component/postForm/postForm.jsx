import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service  from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function postForm({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: slug?.slug || "",
      content: post?.status || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authReducer.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.fileUpload(data.image[0]) : null;
      if (file) {
        service.deleteFile(post.featuredImage);
      }
    }

    const dbPost = await service.updatePost(post.$id, {
      ...data,
      featuredImage: file ? file.$id : undefined,
    });
    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await service.fileUpload(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
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
        .replace(/\s/g, "-");

    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", setTransfrom(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValues={setValue("content")}
        />
      </div>

      <div className="w-2/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.filePreview(post.featuredImage)}
              alt={post.title}
            />
            <Select
              options={["active", "inactive"]}
              className="mb-4"
              label="Status"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="e-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
