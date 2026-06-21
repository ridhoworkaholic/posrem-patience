import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserById } from "../service/user.service";
import { useAuthStore } from "../stores/auth.store";

import GrowthChart from "../components/growthChart";

import { getMonthName, getYearEntries } from "../utils/growth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);

  const [user, setUser] = useState<any>(null);

  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!userId) return;

      const result = await getUserById(userId);

      setUser(result);

      const years = Object.keys(result?.data ?? {});

      const latestYear = years.sort((a, b) => Number(b) - Number(a))[0];

      if (latestYear) {
        setSelectedYear(latestYear);
      }
    };

    load();
  }, [userId]);

  const entries = useMemo(
    () => getYearEntries(user, selectedYear),
    [user, selectedYear],
  );

  const labels = entries.map((item) => getMonthName(item.createdAt));

  const tbData = entries.map((item) => Number(item.tb));

  const bbData = entries.map((item) => Number(item.bb));

  const years = Object.keys(user?.data ?? {});

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-cyan-50 px-4 py-6">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div
          className="
    relative
    overflow-hidden
    rounded-4xl
    bg-white
    p-6
    shadow-xl
  "
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-200/40 blur-3xl" />

          <div className="mb-3 text-center text-5xl">🚀</div>

          <h1 className="text-center text-2xl font-extrabold text-slate-800">
            Halo {user?.name} 👋
          </h1>

          <p className="mt-2 text-center text-sm text-slate-500">
            Pantau progres kesehatanmu setiap bulan
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div
            className="
      rounded-[28px]
      bg-white
      p-5
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
          >
            <div className="text-4xl">📐</div>

            <p className="mt-2 text-xs text-slate-500">Tinggi Terakhir</p>

            <h2 className="mt-1 text-3xl font-black text-slate-800">
              {tbData[tbData.length - 1] || 0}
            </h2>
          </div>

          <div
            className="
      rounded-[28px]
      bg-white
      p-5
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
          >
            <div className="text-4xl">⚖️</div>

            <p className="mt-2 text-xs text-slate-500">Berat Terakhir</p>

            <h2 className="mt-1 text-3xl font-black text-slate-800">
              {bbData[bbData.length - 1] || 0}
            </h2>
          </div>
        </div>

        {/* Year Selector */}
        <div className="mt-5 rounded-4xl bg-white p-5 shadow-xl">
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            📅 Pilih Tahun
          </label>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-slate-50
      px-4
      py-3
      font-medium
      text-slate-700
      outline-none
      transition
      focus:border-indigo-500
      focus:bg-white
    "
          >
            {years.map((year) => (
              <option key={year} value={year}>
                Tahun {year}
              </option>
            ))}
          </select>
        </div>

        {/* Charts */}
        <div className="mt-5 space-y-5">
          <div className="overflow-hidden rounded-4xl bg-white p-5 shadow-lg transition hover:scale-[1.02]">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-indigo-100
      text-xl
    "
              >
                📈
              </div>

              <div>
                <h2 className="font-bold text-slate-800">Tinggi Badan</h2>

                <p className="text-xs text-slate-500">Grafik perkembangan</p>
              </div>
            </div>

            <GrowthChart title="Tinggi Badan" labels={labels} data={tbData} />
          </div>

          <div className="overflow-hidden rounded-4xl bg-white p-5 shadow-lg transition hover:scale-[1.02]">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-orange-100
      text-xl
    "
              >
                🔥
              </div>

              <div>
                <h2 className="font-bold text-slate-800">Berat Badan</h2>

                <p className="text-xs text-slate-500">Grafik perkembangan</p>
              </div>
            </div>

            <GrowthChart title="Berat Badan" labels={labels} data={bbData} />
          </div>
        </div>

        {/* History */}
        <div className="mt-6 rounded-4xl bg-white p-5 shadow-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl">📚</span>

            <h2 className="text-lg font-bold text-slate-800">
              Riwayat Bulanan
            </h2>
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 py-8 text-center">
              <div className="text-4xl">🐣</div>

              <p className="mt-3 text-sm text-slate-500">
                Belum ada data pertumbuhan
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() =>
                    navigate(`/detail/${selectedYear}/${entry.id}`)
                  }
                  className="
    group
    flex
    w-full
    items-center
    justify-between
    rounded-[28px]
    bg-linear-to-r
    from-indigo-500
    via-purple-500
    to-cyan-500
    p-4
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
    active:scale-95
  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-white/20
        text-2xl
        backdrop-blur-md
      "
                    >
                      📊
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold text-white">
                        {getMonthName(entry.createdAt)}
                      </h3>

                      <p className="text-xs text-white/80">
                        Lihat detail bulan ini
                      </p>
                    </div>
                  </div>

                  <div
                    className="
      text-2xl
      text-white
      transition-all
      duration-300
      group-hover:translate-x-2
      group-hover:scale-125
    "
                  >
                    →
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pb-6 text-center">
          <p className="text-xs text-slate-500">
            Keep growing, keep shining ✨
          </p>
        </div>
      </div>
    </div>
  );
}
