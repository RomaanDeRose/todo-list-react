import { useState } from "react";

const useForm = (initialForm = {}) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const actualizeForm = (newForm) => {
    setForm(newForm);
  };

  return [form, handleChange, resetForm, actualizeForm];
};

export { useForm };
