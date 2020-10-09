import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogForm = () => {
  const handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  return (
    <Editor
      apiKey="abh3yg0xpuwi7wp76gc8etjalbd4yg93ib50ubokso0npxiq"
      initialValue="<p>Initial content</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image",
          "charmap print preview anchor help",
          "searchreplace visualblocks code",
          "insertdatetime media table paste wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | help",
      }}
      onChange={handleEditorChange}
    />
  );
};

export default BlogForm;
