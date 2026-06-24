export function LoginScreen({ error, onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6 font-sans">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Mundial 2026</p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">Álbum de figuritas</h1>
          <p className="mt-3 text-sm text-white/70">
            Iniciá sesión para cargar tu álbum personal.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={onLogin}
            className="w-full rounded-2xl bg-white px-5 py-3 font-bold uppercase tracking-wide text-neutral-950 transition hover:scale-[1.02] hover:bg-white/90"
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="w-full rounded-2xl border border-white/25 px-5 py-3 font-bold uppercase tracking-wide text-white transition hover:scale-[1.02] hover:bg-white/10"
          >
            Crear cuenta
          </button>
        </div>
      </section>
    </div>
  );
}
