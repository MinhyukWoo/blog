import React, { useState, useEffect } from "react";
import { Article } from "../constants/article";
import { BACKEND } from "../constants/constant";
import axios from "axios";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

function ListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const buttonAppBar = (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography> Mews</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
  useEffect(() => {
    axios
      .get(BACKEND.ARTICLES)
      .then((data) => {
        if (data && data.data && data.data.items) {
          for (const item of data.data.items) {
            const article = new Article(
              item.key,
              item.title,
              item.author,
              item.body
            );
            setArticles((items) => {
              if (
                items.find((item) => {
                  return item.key === article.key;
                })
              ) {
                return items.map((item: any) => {
                  if (item.key === article.key) {
                    return article;
                  } else {
                    return item;
                  }
                });
              } else {
                return [...items, article];
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        const article = new Article(0, "test", "minhyuk woo", "test");
        setArticles(() => {
          return [article];
        });
      });
      
  }, []);
  return (
    <div>
      {buttonAppBar}
      <ul>
        {articles.map((article) => {
          return (
            <Card key={article.key} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/1280px-Oranges_-_whole-halved-segment.jpg"
                ></CardMedia>
                <CardContent>
                  <Typography>{article.title}</Typography>
                  <Typography>{article.author}</Typography>
                  <Typography>요약</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}

export default ListPage;
