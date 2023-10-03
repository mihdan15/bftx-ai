"use client";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Adminload } from "@/components/skeleton";
import Alertsccs from "@/components/alertsccs";

const ADD_LINK = gql`
  mutation AddLink($name: String!, $url: String!, $categoryId: Int!) {
    insert_Links_one(
      object: { name: $name, url: $url, category_id: $categoryId }
    ) {
      id
      name
      url
    }
  }
`;

const GET_LINKS = gql`
  query GetLinks {
    Categories {
      id
      title
      Links {
        id
        name
        url
      }
    }
  }
`;

const UPDATE_LINK = gql`
  mutation UpdateLink(
    $id: Int!
    $name: String!
    $url: String!
    $categoryId: Int!
  ) {
    update_Links_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, url: $url, category_id: $categoryId }
    ) {
      id
      name
      url
    }
  }
`;

const DELETE_LINK = gql`
  mutation DeleteLink($id: Int!) {
    delete_Links_by_pk(id: $id) {
      id
    }
  }
`;

export default function Home() {
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "default"
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);

  const [addLink] = useMutation(ADD_LINK);
  const { data, loading, error, refetch } = useQuery(GET_LINKS);
  const [updateLink] = useMutation(UPDATE_LINK);
  const [deleteLink] = useMutation(DELETE_LINK);

  const handleSubmitLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedCategory === "default") {
      alert("Please select a category first.");
      return;
    }
    setIsAdding(true);
    if (isEditing && editingLinkId) {
      displayAlert("Sedang Mengedit Tool...", "blue");
      try {
        await updateLink({
          variables: {
            id: editingLinkId,
            name: newLinkName,
            url: newLinkUrl,
            categoryId: selectedCategory,
          },
        });
        setIsEditing(false);
        setEditingLinkId(null);
        displayAlert("Berhasil Mengedit Tool", "green");
        setNewLinkName("");
        setNewLinkUrl("");
        setSelectedCategory("default");
        setIsAdding(false);
        refetch();
      } catch (error) {
        console.error("Failed to add link:", error);
        displayAlert("Gagal Mengedit Tool", "red");
        setIsEditing(false);
        setIsAdding(false);
        setSelectedCategory("default");
      }
    } else {
      displayAlert("Sedang Menambahkan Tool...", "blue");

      try {
        await addLink({
          variables: {
            name: newLinkName,
            url: newLinkUrl,
            categoryId: selectedCategory,
          },
        });
        setIsEditing(false);
        setEditingLinkId(null);
        displayAlert("Berhasil Menambah Tools Baru", "green");
        setNewLinkName("");
        setNewLinkUrl("");
        setSelectedCategory("default");
        setIsAdding(false);
        refetch();
      } catch (error) {
        console.error("Failed to add link:", error);
      }
    }
    setNewLinkName("");
    setNewLinkUrl("");
  };

  const handleEdit = (link: any, category: any) => {
    setNewLinkName(link.name);
    setNewLinkUrl(link.url);
    setSelectedCategory(category.id);
    setIsEditing(true);
    setEditingLinkId(link.id);
    console.log("Editing link with category_id:", category.id);
  };

  const displayAlert = (message: any, color: any) => {
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlert(true);

    // Anda dapat menambahkan delay untuk secara otomatis menyembunyikan alert setelah beberapa detik, misalnya:
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Alert akan otomatis menghilang setelah 5 detik
  };

  const handleDelete = async (linkId: number) => {
    setIsDeleting(true);
    displayAlert("Sedang Menghapus Tool...", "blue");
    try {
      await deleteLink({ variables: { id: linkId } });
      displayAlert("Berhasil Menghapus Tool", "green");
      setShowAlert(true);
      refetch();
      setIsDeleting(false);
      // Opsi: Anda bisa memuat ulang data setelah menghapus atau menggunakan cache Apollo untuk memperbarui tampilan
    } catch (error) {
      console.error("Failed to delete link:", error);
      displayAlert("Gagal Menghapus Tool", "red");
    }
  };

  return (
    <div className="p-8 star-bg">
      {showAlert && <Alertsccs message={alertMessage} color={alertColor} />}
      <form onSubmit={handleSubmitLink} className="space-y-4">
        {" "}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block p-2 border rounded shadow-sm w-full max-w-lg mx-auto"
        >
          <option value="default" disabled>
            Select a category
          </option>
          {data?.Categories?.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          required
          placeholder="Link Name"
          value={newLinkName}
          onChange={(e) => setNewLinkName(e.target.value)}
          className="block w-full p-2 border rounded shadow-sm"
        />
        <input
          type="text"
          required
          placeholder="Link URL"
          value={newLinkUrl}
          onChange={(e) => setNewLinkUrl(e.target.value)}
          className="block w-full p-2 border rounded shadow-sm"
        />
        <button
          disabled={isAdding}
          type="submit"
          className={`p-2 ${
            isAdding ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded shadow-sm `}
        >
          {isEditing ? "Update Tool" : "Add Tool"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditingLinkId(null);
              setNewLinkName("");
              setNewLinkUrl("");
              setSelectedCategory("default");
            }}
            className="p-2 bg-gray-500 text-white rounded shadow-sm hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-10">
        <h2 className="text-xl mb-5">All Links:</h2>
        {loading && <Adminload />}
        {error && <p>Error: {error.message}</p>}
        <ul>
          {data?.Categories?.map((Category: any) => (
            <li key={Category.id}>
              {Category.Links.map((link: any) => (
                <div
                  key={link.id}
                  className="mb-4 p-4 border rounded shadow-sm space-y-2 bg-[#535667] backdrop-filter backdrop-blur-sm"
                >
                  <div>
                    <strong>Name:</strong> {link.name}
                  </div>
                  <div>
                    <strong>URL:</strong>{" "}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                  <div>
                    <strong>Category:</strong> {Category.title}
                  </div>
                  <div className="mt-2 space-x-2">
                    <button
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleEdit(link, Category)}
                    >
                      Edit
                    </button>
                    <button
                      disabled={isDeleting}
                      className={`p-1 ${
                        isDeleting
                          ? "bg-red-400"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white rounded `}
                      onClick={() => handleDelete(link.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
