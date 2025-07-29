"use client";

import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { MdEmail, MdLocationPin } from "react-icons/md";

export default function SectionContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Pesan berhasil dikirim!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Gagal mengirim pesan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 py-16" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 dark:text-gray-400 mb-10">
            Ready to explore partnership opportunities? We'd love to hear from
            you. Let's discuss how we can help your business reach its full
            potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kiri: Form Input */}
          <div>
            <div className="p-6 border rounded-xl shadow bg-white dark:bg-zinc-800">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Kirim Pesan
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email@gmail.com"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter your message here"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-8 text-center bg-blue-900 text-white  rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Kanan: Info Kontak dengan Icon */}
          <div>
            <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Contact Information
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white p-2 text-xl rounded-md">
                  <MdLocationPin />
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Address</span> <br />
                  Jl. Pantai Indah Kapuk, Jl. Marina Raya Ruko Cordoba No.38
                  Blok H, RT.6/RW.2, Kamal Muara, Penjaringan, Jakarta Utara
                  14470
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white rounded-md p-2 text-xl">
                  <MdEmail />
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Email</span> <br />
                  email@domain.com
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white rounded-md p-2 text-xl">
                  <FaPhoneAlt />
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Phone</span> <br />
                  +62 812 3456 7890
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white rounded-md p-2 text-xl">
                  <IoIosAlarm />
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Business Hours</span> <br />
                  Monday - Friday 09.00 AM - 05.00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
