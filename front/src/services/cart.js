export function lerCarrinho() {
    try {
      const ls = JSON.parse(localStorage.getItem('cart'))
      return ls || []
    } catch (_) {}

    return []
}

export function salvarCarrinho(produtos) {
    localStorage.setItem('cart', JSON.stringify(produtos))
}