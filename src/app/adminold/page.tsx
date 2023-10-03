"use client";
import Link from "next/link";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import Alertsccs from "@/components/alertsccs";

export default function Home() {
  const [namaLink, setNamaLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [iconLink, setIconLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editLink, setEditLink] = useState({
    id: null,
    nama: "",
    url: "",
    icon: "",
  });

  // Query Add Data
  const ADD_LINK_MUTATION = gql`
    mutation Insert_Linku(
      $nama_link: String!
      $url_link: String!
      $icon_link: String!
    ) {
      insert_Linku(
        objects: { nama: $nama_link, url: $url_link, icon: $icon_link }
      ) {
        returning {
          id
          nama
          url
          icon
        }
      }
    }
  `;

  //Query Get Data
  const GET_DATA = gql`
    query MyQuery {
      Linku {
        id
        icon
        nama
        url
      }
    }
  `;

  const EDIT_DATA_MUTATION = gql`
    mutation UpdateLinku(
      $id: Int!
      $nama_link: String!
      $url_link: String!
      $icon_link: String!
    ) {
      update_Linku(
        where: { id: { _eq: $id } }
        _set: { nama: $nama_link, url: $url_link, icon: $icon_link }
      ) {
        affected_rows
      }
    }
  `;

  const DELETE_DATA = gql`
    mutation DeleteData($id: Int!) {
      delete_Linku(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_DATA);

  const [addData] = useMutation(ADD_LINK_MUTATION, {
    onCompleted: () => {
      setAlertMessage("Berhasil Menambahkan Link Baru");
      setShowAlert(true);
      setAlertColor("green");
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      console.log("Data inserted successfully");
      setNamaLink("");
      setUrlLink("");
      setIconLink("");
      refetch();
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
  });

  const handleTambah = async () => {
    if (namaLink === "" || urlLink === "") {
      setAlertMessage("Nama atau URL tidak boleh kosong!");
      setShowAlert(true);
      setAlertColor("red");
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    try {
      await addData({
        variables: {
          nama_link: namaLink,
          url_link: urlLink,
          icon_link: iconLink,
        },
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const [editData] = useMutation(EDIT_DATA_MUTATION, {
    onCompleted: () => {
      setAlertMessage("Berhasil Mengedit Link");
      setShowAlert(true);
      setAlertColor("green");
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      setEditMode(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error editing data:", error);
    },
  });

  const handleEdit = (link: any) => {
    setEditLink(link);
    setNamaLink(link.nama);
    setUrlLink(link.url);
    setIconLink(link.icon || "");
    setEditMode(true);
  };

  const handleSubmit = async () => {
    if (editMode && editLink.id) {
      try {
        await editData({
          variables: {
            id: editLink.id,
            nama_link: namaLink,
            url_link: urlLink,
            icon_link: iconLink,
          },
        });
        setNamaLink("");
        setUrlLink("");
        setIconLink("");
      } catch (error) {
        console.error("Error editing data:", error);
      }
    } else {
      handleTambah();
    }
  };

  const [deleteData] = useMutation(DELETE_DATA, {
    onCompleted: () => {
      console.log("Data deleted successfully");
      setAlertMessage("Link Anda Berhasil Dihapus");
      setAlertColor("green");

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
    },
  });

  const handleDelete = async (id: any) => {
    try {
      await deleteData({ variables: { id } });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gradient-to-b from-sky-800 to-slate-900 min-h-screen p-8 bg-svg">
      {showAlert && <Alertsccs message={alertMessage} color={alertColor} />}
      <form className="w-full max-w-lg mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="nama"
            >
              Nama Link
            </label>
            <input
              className="appearance-none px-4 mb-3 leading-tight focus:outline-none focus:bg-white  placeholder:italic text-slate-700 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              id="nama"
              type="text"
              placeholder="Masukkan Nama Link mu..."
              name="nama_link"
              value={namaLink}
              onChange={(e) => setNamaLink(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="url"
            >
              URL
            </label>
            <textarea
              className="appearance-none h-36 resize-none px-4 mb-3 leading-tight focus:outline-none focus:bg-white  placeholder:italic text-slate-700 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              id="url"
              placeholder="Masukkan URL yang kamu tuju..."
              name="url_link"
              value={urlLink}
              onChange={(e) => setUrlLink(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="logo"
            >
              Icon (Optional)
            </label>
            <textarea
              className="appearance-none h-36 resize-none px-4 mb-3 leading-tight focus:outline-none focus:bg-white  placeholder:italic text-slate-700 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              id="url"
              placeholder="Masukkan url icon dari link mu..."
              name="icon_link"
              value={iconLink}
              onChange={(e) => setIconLink(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex items-center">
          <div className="md:w-1/3">
            <button
              className={`shadow ${
                editMode
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-cyan-800 hover:bg-cyan-900"
              } focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
              type="button"
              onClick={handleSubmit}
            >
              {editMode ? "Edit" : "Tambah"}
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Url
              </th>
              <th scope="col" className="px-6 py-3">
                Icon
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.Linku.map((link: any, index: any) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : " bg-gray-900"
                } border-b dark:border-gray-700`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {link.nama}
                </td>
                <td className="px-6 py-4">
                  {link.nama.includes("titip")
                    ? link.url
                    : link.url.slice(0, 100)}
                </td>
                <td className="px-6 py-4">
                  {link.icon && link.icon.slice(0, 100)}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => handleEdit(link)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline px-2"
                    onClick={() => handleDelete(link.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
