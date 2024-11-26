import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getProductDetail } from "../services/product";
import toast from "react-hot-toast";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";

type Props = {
  onSubmit: SubmitHandler<Product>;
};

export function ProductForm({ onSubmit }: Props) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (!id) return;
    getProductDetail(id)
      .then(({ data }) => {
        reset(data);
      })
      .catch(() => toast.error("Error"));
  }, [id, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors?.title && (
          <small className="text-danger">{errors.title.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          image
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("image", {
            required: "image is required",
          })}
        />
        {errors?.image && (
          <small className="text-danger">{errors.image.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          price
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("price", {
            required: "price is required",
          })}
        />
        {errors?.price && (
          <small className="text-danger">{errors.price.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("description", {
            required: "description is required",
          })}
        />
        {errors?.description && (
          <small className="text-danger">{errors.description.message}</small>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
