import "./Profile.css"

export default function Profile() {
  return (
    <section className="profile-container">
      <div className="profile-card">
        <h1>Marcus Puust</h1>

        <ul className="hobbies">
          <li>⚽ Jalgpall</li>
          <li>💻 Programmeerimine</li>
          <li>🏋️‍♂️ Jõusaal</li>
        </ul>

        <form
          className="contact-form"
          onSubmit={e => e.preventDefault()}
        >
          <label>
            E-mail
            <input
              type="email"
              name="email"
              placeholder="sina@gmail.com"
            />
          </label>

          <label>
            Sõnum
            <textarea
              name="message"
              placeholder="Edasta oma sõnum..."
              rows={4}
            />
          </label>
        </form>

        <button
          className="cta-btn"
          type="button"
        >
          Võta ühendust
        </button>
      </div>
    </section>
  )
}
