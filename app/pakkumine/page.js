'use client';

import { useState } from 'react';

const MATERIALS = ['Tamm', 'Mänd', 'Pähkel', 'Saar', 'Muu'];

const initialState = {
  email: '',
  productName: '',
  material: '',
  dimensions: '',
  installation: '',
  notes: '',
};

const initialErrors = {
  email: '',
  productName: '',
  material: '',
  installation: '',
};

function validate(fields) {
  const errors = { ...initialErrors };
  let valid = true;

  if (!fields.email.trim()) {
    errors.email = 'E-posti aadress on kohustuslik.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Palun sisesta korrektne e-posti aadress.';
    valid = false;
  }

  if (!fields.productName.trim()) {
    errors.productName = 'Toote nimetus on kohustuslik.';
    valid = false;
  }

  if (!fields.material) {
    errors.material = 'Palun vali materjal.';
    valid = false;
  }

  if (!fields.installation) {
    errors.installation = 'Palun vali, kas paigaldus on vajalik.';
    valid = false;
  }

  return { errors, valid };
}

export default function PakkuminePage() {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { errors: newErrors, valid } = validate(fields);
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('Send failed');
      setStatus('success');
      setFields(initialState);
    } catch {
      setStatus('error');
    }
  }

  const inputClass = (field) =>
    `w-full border-b bg-transparent py-3 text-sm text-dark placeholder:text-dark/30 outline-none transition-colors duration-200 focus:border-dark ${
      errors[field] ? 'border-red-400' : 'border-dark/25'
    }`;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-10">
      <div className="max-w-xl mx-auto">
        <p className="section-title">Küsi pakkumist</p>
        <p className="text-sm text-dark/55 text-center mb-14 leading-relaxed">
          Täida allolev vorm ja meie võtame teiega esimesel võimalusel ühendust.
        </p>

        {status === 'success' ? (
          <div className="bg-beige border border-dark/10 rounded-sm p-10 text-center">
            <svg className="mx-auto mb-4 text-gold" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <h2 className="font-serif text-2xl text-dark mb-3">Täname päringu eest!</h2>
            <p className="text-sm text-dark/60 leading-relaxed">
              Oleme teie kirja kätte saanud ja võtame teiega peagi ühendust.
              Kinnitusmeil on saadetud teie e-posti aadressile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-2">
                Kliendi e-post <span className="text-gold">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="teie@email.ee"
                className={inputClass('email')}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Product name */}
            <div>
              <label htmlFor="productName" className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-2">
                Toote nimetus <span className="text-gold">*</span>
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                value={fields.productName}
                onChange={handleChange}
                placeholder="nt. Söögilaud, voodi, riiul…"
                className={inputClass('productName')}
                aria-describedby={errors.productName ? 'productName-error' : undefined}
              />
              {errors.productName && (
                <p id="productName-error" className="mt-1.5 text-xs text-red-500">
                  {errors.productName}
                </p>
              )}
            </div>

            {/* Material */}
            <div>
              <fieldset>
                <legend className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-4">
                  Materjali valik <span className="text-gold">*</span>
                </legend>
                <div className="flex flex-wrap gap-3">
                  {MATERIALS.map((mat) => (
                    <label
                      key={mat}
                      className={`cursor-pointer px-4 py-2 border text-xs tracking-[0.1em] uppercase transition-colors duration-150 rounded-sm ${
                        fields.material === mat
                          ? 'bg-dark text-background border-dark'
                          : 'text-dark border-dark/30 hover:border-dark/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="material"
                        value={mat}
                        checked={fields.material === mat}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {mat}
                    </label>
                  ))}
                </div>
                {errors.material && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.material}</p>
                )}
              </fieldset>
            </div>

            {/* Dimensions */}
            <div>
              <label htmlFor="dimensions" className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-2">
                Ligikaudsed mõõtmed
              </label>
              <input
                id="dimensions"
                name="dimensions"
                type="text"
                value={fields.dimensions}
                onChange={handleChange}
                placeholder="nt. 200 × 90 × 76 cm"
                className="w-full border-b border-dark/25 bg-transparent py-3 text-sm text-dark placeholder:text-dark/30 outline-none focus:border-dark transition-colors duration-200"
              />
            </div>

            {/* Installation */}
            <div>
              <fieldset>
                <legend className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-4">
                  Paigaldus vajalik <span className="text-gold">*</span>
                </legend>
                <div className="flex gap-6">
                  {['Jah', 'Ei'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="installation"
                        value={opt}
                        checked={fields.installation === opt}
                        onChange={handleChange}
                        className="accent-dark w-4 h-4"
                      />
                      <span className="text-sm text-dark">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.installation && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.installation}</p>
                )}
              </fieldset>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs tracking-[0.15em] uppercase text-dark/50 mb-2">
                Lisainfo
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={fields.notes}
                onChange={handleChange}
                placeholder="Kirjeldage oma soovi vabas vormis…"
                className="w-full border-b border-dark/25 bg-transparent py-3 text-sm text-dark placeholder:text-dark/30 outline-none focus:border-dark transition-colors duration-200 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-500 text-center">
                Midagi läks valesti. Palun proovi uuesti või saada e-kiri otse aadressile{' '}
                <a href="mailto:info@pajakapuidukoda.ee" className="underline">
                  info@pajakapuidukoda.ee
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Saadan…' : 'Saada päring'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
