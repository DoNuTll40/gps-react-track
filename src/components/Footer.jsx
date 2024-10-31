
export default function Footer() {

    const Year = new Date().getFullYear();

  return (
    <footer className="text-center text-xs md:text-sm">
        <p><sup>&copy;</sup> {Year} donut-ll40 development v.0.7.9</p>
    </footer>
  )
}
