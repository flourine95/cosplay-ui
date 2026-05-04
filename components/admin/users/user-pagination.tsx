import { ChevronLeft, ChevronRight } from "lucide-react"

export default function UserPagination() {
  return (
    <div className="flex justify-between p-4">
      <p className="text-xs text-slate-400">Hiển thị 1-5 / 12,840</p>

      <div className="flex gap-2">
        <button>
          <ChevronLeft />
        </button>
        <button className="h-8 w-8 bg-indigo-600 text-white">1</button>
        <button>2</button>
        <button>3</button>
        <button>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
