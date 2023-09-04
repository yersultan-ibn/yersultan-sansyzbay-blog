import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { submitComment } from "@/services";

interface CommentFormProps {
  slug: string;
}

interface FormData {
  name: string | null;
  email: string | null;
  comment: string | null;
  storeData: boolean;
}

const CommentsForm: React.FC<CommentFormProps> = ({ slug }): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });

  useEffect(() => {
    const localStorageData = window.localStorage;
    const initialFormData = {
      name: localStorageData.getItem("name"),
      email: localStorageData.getItem("email"),
      storeData:
        localStorageData.getItem("name") || localStorageData.getItem("email"),
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;

    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name as string);
      window.localStorage.setItem("email", email as string);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        const updatedFormData: FormData = {
          name: storeData ? name : "",
          email: storeData ? email : "",
          comment: "",
          storeData,
        };
        setFormData(updatedFormData);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };
  return (
    <div className="light:bg-white dark:bg-[#283445] shadow-lg p-8 pb-12 mb-8">
      <h1 className="text-xl mb-8 font-semibold border-b pb-4">Comment</h1>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 text-gray-700 bg-gray-100 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 dark:bg-white focus:ring-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 dark:bg-white focus:ring-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="light:text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my email & number for the next time i comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for Review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
