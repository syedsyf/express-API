import { client } from "../index.js";

export const updateMoviById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await client
    .db("b38wd")
    .collection("momvies")
    .updateOne({ id: id }, { $set: body });
  res.send({ message: result });
};

export const createMovi = async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await client
    .db("b38wd")
    .collection("momvies")
    .insertMany(data);
  res.send(result);
};

export const getAllMovies = async (req, res) => {
  const query = req.query;
  const movi = await client
    .db("b38wd")
    .collection("momvies")
    .find(query)
    .toArray();
  console.log(movi);
  res.send(movi);
};

export const getMoviById = async (req, res) => {
  const id = req.params.id;
  const movi = await client
    .db("b38wd")
    .collection("momvies")
    .findOne({ id: id });
  console.log(movi);
  movi ? res.send(movi) : res.status(404).send({ Error: "Movi Not Found" });
};

export const deleteMoviById = async (req, res) => {
  const id = req.params.id;
  const result = await client
    .db("b38wd")
    .collection("momvies")
    .deleteOne({ id: id });
  res.send({ message: "deleted successfully" });
};
