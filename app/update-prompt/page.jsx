"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) alert("Prompt Id not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          tag: post.tag,
          prompt: post.prompt,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <>
      <Suspense>
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      </Suspense>
    </>
  );
};

export default UpdatePrompt;
