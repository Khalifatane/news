type TickerItem = {
  _key?: string
  symbol?: string
  price?: string
  change?: string
  direction?: 'up' | 'down' | 'neutral'
}

const sampleTickerItems: TickerItem[] = [
  {symbol: 'ORCL', price: '121.57', change: '+0.50%', direction: 'up'},
  {symbol: 'NVDA', price: '128.04', change: '-1.20%', direction: 'down'},
  {symbol: 'AAPL', price: '198.32', change: '+0.31%', direction: 'up'},
  {symbol: 'MSFT', price: '415.12', change: '-0.08%', direction: 'down'},
  {symbol: 'GOOGL', price: '175.40', change: '+1.08%', direction: 'up'},
  {symbol: 'META', price: '585.22', change: '-0.42%', direction: 'down'},
  {symbol: 'AMZN', price: '178.90', change: '+0.19%', direction: 'up'},
  {symbol: 'TSLA', price: '248.50', change: '-2.10%', direction: 'down'},
]

function TickerValue({item}: {item: TickerItem}) {
  const direction = item.direction || 'neutral'

  return (
    <span className="finance-ticker-item">
      <strong>{item.symbol}</strong>
      <span>{item.price}</span>
      <span className={`finance-ticker-change finance-ticker-${direction}`}>
        <span className="finance-ticker-indicator" aria-hidden="true" />
        {item.change}
      </span>
    </span>
  )
}

export function FinanceTicker({items, enabled}: {items?: TickerItem[]; enabled?: boolean}) {
  const configuredItems = items?.filter((item) => item.symbol && item.price && item.change) || []
  const isSampleData = configuredItems.length === 0
  const tickerItems = isSampleData ? sampleTickerItems : configuredItems
  const repeatedItems = Array.from(
    {length: Math.max(8, tickerItems.length)},
    (_, index) => tickerItems[index % tickerItems.length],
  )

  if (enabled === false) return null

  return (
    <section className="finance-ticker" aria-label={isSampleData ? 'Urgent, à la une des infos. Valeurs financières d’exemple, non actualisées en direct.' : 'Urgent, à la une des infos. Valeurs financières saisies par un éditeur, non actualisées en direct.'}>
      <p className="finance-ticker-label">
        <strong>Urgent</strong>
        <span>À la une des infos</span>
        {isSampleData && <span className="finance-ticker-sample">Valeurs d’exemple</span>}
      </p>
      <div className="finance-ticker-viewport">
        <div className="finance-ticker-track">
          {[false, true].map((duplicate) => (
            <div className="finance-ticker-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {repeatedItems.map((item, index) => (
                <TickerValue item={item} key={`${item._key || item.symbol}-${index}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}