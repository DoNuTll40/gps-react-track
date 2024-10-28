
export default function Footer() {

    const Year = new Date().getFullYear();

  return (
    <footer className="text-center">
        <p><sup>&copy;</sup> {Year} donut-ll40 development v.0.5.1</p>
    </footer>
  )
}
