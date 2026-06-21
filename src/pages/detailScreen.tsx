import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Ruler, Weight, Activity, CircleDot } from "lucide-react";

import { getUserById } from "../service/user.service";
import { useAuthStore } from "../stores/auth.store";

import { getBmiStyle } from "../utils/bmi";

export default function DetailPage() {
  const navigate = useNavigate();

  const { year, entryId } = useParams();

  const userId = useAuthStore((state) => state.userId);

  const [loading, setLoading] = useState(true);

  const [entry, setEntry] = useState<any>(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (!userId || !year || !entryId) {
          return;
        }

        const user = await getUserById(userId);

        const detail = user?.data?.[year]?.[entryId];

        setEntry(detail);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [userId, year, entryId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <h2 className="font-semibold text-slate-700">Memuat Data...</h2>

          <p className="mt-1 text-sm text-slate-500">Tunggu sebentar ya 🚀</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-6xl">😕</div>

          <h2 className="text-xl font-bold text-slate-800">
            Data Tidak Ditemukan
          </h2>

          <p className="mt-2 text-slate-500">
            Coba kembali ke dashboard dan pilih data lain.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:scale-105"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const bmiStyle = getBmiStyle(entry.bmiDesc);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4 py-5">
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl bg-white p-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Detail Pertumbuhan
            </h1>

            <p className="text-sm text-slate-500">📅 Tahun {year}</p>
          </div>
        </div>

        {/* Hero BMI */}

        <div
          className={`relative overflow-hidden rounded-3xl p-6 shadow-xl backdrop-blur-sm transition-all duration-300 ${bmiStyle.bg}`}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <p className="mb-2 text-sm font-medium text-slate-600">
            Status BMI Kamu
          </p>

          <h2
            className={`text-3xl font-extrabold md:text-4xl ${bmiStyle.text}`}
          >
            {entry.bmiDesc}
          </h2>

          <p className="mt-3 text-sm text-slate-600">
            Tetap jaga pola hidup sehat dan aktif ya 💪
          </p>
        </div>

        {/* Statistik */}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <StatCard
            icon={<Ruler size={22} />}
            title="Tinggi"
            value={`${entry.tb} cm`}
          />

          <StatCard
            icon={<Weight size={22} />}
            title="Berat"
            value={`${entry.bb} kg`}
          />

          <StatCard
            icon={<Activity size={22} />}
            title="BMI"
            value={entry.bmi}
          />

          <StatCard
            icon={<CircleDot size={22} />}
            title="Lingkar Perut"
            value={`${entry.lp ?? "-"} cm`}
          />

          <StatCard
            icon={<CircleDot size={22} />}
            title="LILA"
            value={`${entry.lila ?? "-"} cm`}
          />
        </div>

        {/* Detail */}

        <div className="mt-6 rounded-3xl bg-white/90 p-5 shadow-xl backdrop-blur-md">
          <h3 className="mb-5 text-lg font-bold text-slate-800">
            📊 Informasi Lengkap
          </h3>

          <div className="space-y-4">
            <InfoRow label="Tinggi Badan" value={`${entry.tb} cm`} />

            <InfoRow label="Berat Badan" value={`${entry.bb} kg`} />

            <InfoRow label="BMI" value={entry.bmi} />

            <InfoRow label="Status BMI" value={entry.bmiDesc} />

            <InfoRow label="Lingkar Perut" value={`${entry.lp ?? "-"} cm`} />

            <InfoRow
              label="Lingkar Lengan Atas"
              value={`${entry.lila ?? "-"} cm`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="group rounded-3xl bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <p className="text-xs text-slate-500">{title}</p>

      <h3 className="mt-1 text-xl font-extrabold text-slate-800">{value}</h3>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-indigo-50">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}
