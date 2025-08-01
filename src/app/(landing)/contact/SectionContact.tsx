"use client";

import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
                  className="w-full h-10 text-center bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Contact Information
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: <MdLocationPin />,
                  title: "Address",
                  value:
                    "Jl. Pantai Indah Kapuk, Jl. Marina Raya Ruko Cordoba No.38 Blok H, RT.6/RW.2, Kamal Muara, Penjaringan, Jakarta Utara 14470",
                },
                {
                  icon: <MdEmail />,
                  title: "Email",
                  value: "email@domain.com",
                },
                {
                  icon: <FaPhoneAlt />,
                  title: "Phone",
                  value: "+62 812 3456 7890",
                },
                {
                  icon: <IoIosAlarm />,
                  title: "Business Hours",
                  value: "Monday - Friday 09.00 AM - 05.00 PM",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="bg-blue-600 text-white p-2 text-xl rounded-md">
                    {item.icon}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-bold">{item.title}</span> <br />
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
