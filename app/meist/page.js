import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Meist — Pajaka Puidukoda',
  description: 'Tutvuge Pajaka Puidukodaga — kes me oleme, mida väärtustame ja kuidas me töötame.',
};

export default function MeistPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <p className="section-title">Meist</p>

      {/* Main two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige rounded-sm">
          {/* Replace /images/meist.jpg with your actual team/workshop photo */}
          <Image
            src="/images/meist.png"
            alt="Pajaka Puidukoda töörühm"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Placeholder shown until image is added */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-dark/20 text-xs tracking-[0.2em] uppercase">Pilt</span>
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col justify-center gap-8">
          <h1 className="font-serif text-3xl md:text-4xl text-dark leading-snug">
            Pajaka Puidukoja meister -<br /> Rait Elfenbein
          </h1>

          {/* Replace this text with your actual about-us copy */}
          <div className="flex flex-col gap-5 text-sm text-dark/65 leading-relaxed">
            <p>
              Rait Elfenbein alustas tisleriõpinguid Pärnus 2019. aastal, kus pani aluse oma 
              erialastele teadmistele ja oskustele. Õpingute käigus täiendas ta end praktikal 
              kolmes erinevas ettevõttes, omandades väärtuslikke kogemusi ning tugeva professionaalse 
              põhja. 2022. saavutas ta kutsevõistlusel Noor Meister 4. koha.
            </p>
            <p>
              Pärast ajateenistuse läbimist 2023. aastal asutas Rait oma ettevõtte. 
              Juba esimesel tegevusaastal on töö olnud aktiivne ning klientide arv on järjepidevalt 
              kasvanud – see peegeldab tema töö kvaliteeti ja klientide usaldust.
            </p>
            <p>
              Raidi jaoks on oluline luua mööblit hooldatud metsadest pärit kvaliteetsest puidust. 
              Oluline on Pajaka Puidukojale kasutada ka pere ettevõttes Pajaka Puit OÜ loodavat 
              toormaterjali. Samas läheneb ta igale projektile paindlikult, kasutades vajadusel 
              ka teisi materjale, et pakkuda lahendusi, mis vastavad kliendi soovidele ja visioonile.
            </p>
          </div>

          <Link href="/pakkumine" className="btn-outline self-start">
            Küsi pakkumist
          </Link>
        </div>
      </div>

      {/* Optional secondary image 
      <div className="mt-16 relative aspect-[16/6] w-full overflow-hidden bg-beige rounded-sm">
        {/* Replace /images/meist-2.jpg with a second workshop/detail photo }
        <Image
          src="/images/meist-2.jpg"
          alt="Pajaka Puidukoda töökoda lähivaates"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-dark/20 text-xs tracking-[0.2em] uppercase">Pilt</span>
        </div>
      </div> */}
    </div>
  );
}
