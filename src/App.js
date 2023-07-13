import "./App.css";
import { useForm } from "react-hook-form";
// import { useState } from "react";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const [userInfo, setUserInfo] = useState();

  const mycollection = collection(db, "AdityaIndustrial");

  const submitFn = async (data) => {
    try {
      const res = await addDoc(mycollection, data);
      reset();
      alert("Form submitted successfully.");
      console.log(res);
    } catch (error) {
      alert("DataBase error!");
      console.log(error);
    }

    // setUserInfo(null);
  };
  return (
    <section>
      <div className="container">
        <form onSubmit={handleSubmit(submitFn)}>
          <h1>Registeration Form</h1>
          <div className="ui form">
            <div className="field">
              <label className="lab">Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Name"
                {...register("Name", { required: "Name is required " })}
              />
            </div>
            <p>{errors.Name?.message}</p>

            <div className="field">
              <label className="lab">Branch</label>
              <select
                class="form-select"
                name="branch"
                id="branch"
                {...register("branch", { required: "Branch is required " })}
              >
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Mathematics and Computing">
                  Mathematics &amp; Computing
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Others">Others</option>
              </select>
              <p>{errors.branch?.message}</p>
            </div>

            <div className="field">
              <label className="lab">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "This is not a valid email",
                  },
                })}
              />
            </div>
            <p>{errors.email?.message}</p>

            <div className="field">
              <label className="lab">Contact Number</label>
              <input
                type="tel"
                name="number"
                placeholder="Contact Number"
                {...register("number", {
                  required: "Number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid Number",
                  },
                })}
              />
            </div>
            <p>{errors.number?.message}</p>

            <button>Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default App;
