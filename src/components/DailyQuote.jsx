import { getTodayQuote } from '../data/rewards'

export default function DailyQuote() {
  const quote = getTodayQuote()

  return (
    <div className="mx-4 md:mx-8 mb-6 py-4 px-5 border-l-2 border-gold/40">
      <p className="text-sm font-body text-text-secondary italic leading-relaxed">
        "{quote.text}"
      </p>
      <p className="text-xs font-body text-text-muted mt-2">
        — {quote.author}
      </p>
    </div>
  )
}
