import React, { useEffect, useState } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import axiosInstance from "../../../../axios";
import Post from "./Post";

function Library() {
  const [post, setPost] = useState({ loading: true, post: null });
  const [category, setCategory] = useState({ refresh: true, option: null });

  useEffect(() => {
    async function getCategories() {
      try {
        await axiosInstance.get(`company/category`).then((res) => {
          const allCategory = res.data;
          setCategory({ refresh: false, option: allCategory });
        });
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, [setCategory]);

  useEffect(() => {
    async function getAllPost() {
      try {
        await axiosInstance.get(`company/post`).then((res) => {
          const allPost = res.data;
          setPost({ loading: false, post: allPost });
        });
      } catch (error) {
        console.log(error);
      }
    }

    getAllPost();
  }, [setPost]);

  return !post.loading ? (
    <div className="library__posts">
      <div>
        <Select backgroundColor="white" size="lg">
          {category.option.map((res) => {
            console.log(category);
            return <option>{res.title}</option>;
          })}
        </Select>
      </div>
      <div className="all__post">
        <Post posts={post.post} />
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        width: "60%",
        margin: "30px auto",
        height: "90vh",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <h1 style={{ fontFamily: "Mosk", fontSize: "40px", marginTop: "30px" }}>
        Loading .....
      </h1>
    </div>
  );
}

export default Library;
