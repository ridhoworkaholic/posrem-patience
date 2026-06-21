import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../service/auth.service";
import { useAuthStore } from "../stores/auth.store";

import { GENDERS } from "../constants/gender";

interface LoginForm {
  name: string;
  gender: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const setUserId = useAuthStore((state) => state.setUserId);

  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (values: LoginForm) => {
    try {
      setError("");

      const user = await loginUser(values.name.trim(), values.gender);

      if (!user) {
        setError("User tidak ditemukan");

        return;
      }

      setUserId(user.id);

      navigate("/dashboard");
    } catch {
      setError("Terjadi kesalahan");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-cyan-300 via-sky-400 to-indigo-500 px-4">
      {/* Background Decorations */}
      <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-pink-300 opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-300 opacity-30 blur-3xl" />
      <div className="absolute top-1/3 right-10 h-32 w-32 rounded-full bg-purple-300 opacity-30 blur-2xl" />

      {/* Login Card */}
      <div className="relative w-full max-w-sm rounded-4xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-lg sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-indigo-500 text-4xl shadow-lg animate-bounce">
            🚀
          </div>

          <h1 className="text-3xl font-extrabold text-slate-800">
            Login Posrem
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Yuk masuk dan lihat perkembanganmu hari ini ✨
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              👤 Nama
            </label>

            <input
              {...register("name", {
                required: true,
              })}
              placeholder="Masukkan nama kamu"
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              🎯 Gender
            </label>

            <select
              {...register("gender", {
                required: true,
              })}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="">Pilih Gender</option>

              {GENDERS.map((gender) => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-pulse rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              ⚠️ {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="group w-full rounded-2xl bg-linear-to-r from-sky-500 to-indigo-600 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              Masuk Sekarang
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ✨
              </span>
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Belajar • Bertumbuh • Jadi Hebat 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
