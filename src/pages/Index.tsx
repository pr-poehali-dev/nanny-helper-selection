import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c0f6b5ff-0f13-4a32-9b8c-0eec6c3ffaf7/files/43ebcd2a-cc00-4bce-ab66-8fb8ff58bbeb.jpg";
const NANNY_IMG = "https://cdn.poehali.dev/projects/c0f6b5ff-0f13-4a32-9b8c-0eec6c3ffaf7/files/57ee2fbf-7651-410c-a8d4-782cd09ea404.jpg";
const FAMILY_IMG = "https://cdn.poehali.dev/projects/c0f6b5ff-0f13-4a32-9b8c-0eec6c3ffaf7/files/e89ed7da-1a2d-43cc-b6d3-f391ed84402b.jpg";

const services = [
  { icon: "Baby",        title: "Няня на час",         desc: "Идеально для вечернего выхода или срочной помощи.",                     price: "от 300 ₽/час" },
  { icon: "Sun",         title: "Няня на день",         desc: "Полный день присмотра за ребёнком.",                                    price: "от 3 500 ₽/день" },
  { icon: "Moon",        title: "Ночная няня",          desc: "Ночной присмотр за малышом — вы отдыхаете.",                            price: "от 2 500 ₽/ночь" },
  { icon: "Home",        title: "Помощница по дому",    desc: "Уборка, глажка, готовка — всё в одних руках.",                          price: "от 250 ₽/час" },
  { icon: "Car",         title: "Сопровождение",        desc: "Доставка в сад, школу, кружки и обратно.",                             price: "от 400 ₽/поездка" },
  { icon: "Heart",       title: "Няня + дом",           desc: "Комплексная помощь: дети и бытовые задачи вместе.",                     price: "от 450 ₽/час" },
];

const whyUs = [
  { icon: "ShieldCheck",  title: "Проверенные специалисты",  desc: "Все няни проходят личное интервью, проверку документов и рекомендаций." },
  { icon: "Zap",          title: "Быстрый подбор",           desc: "Подходящие кандидаты появятся у вас в течение 24 часов." },
  { icon: "RefreshCw",    title: "Гарантия замены",          desc: "Не подошёл специалист — подберём другого совершенно бесплатно." },
  { icon: "Clock",        title: "Гибкий график",            desc: "На час, день, вечер, выходные или на постоянной основе." },
  { icon: "Banknote",     title: "Честные цены",             desc: "Без скрытых комиссий. Работаем прозрачно." },
  { icon: "Smartphone",   title: "Удобно для родителей",     desc: "Заявка онлайн — мы сами свяжемся и подберём под ваш ритм." },
];

const steps = [
  { num: "01", title: "Оставьте заявку",    desc: "Расскажите о задачах за 1 минуту" },
  { num: "02", title: "Уточним детали",     desc: "Менеджер свяжется в течение 15 минут" },
  { num: "03", title: "Подбор кандидатов", desc: "3–5 подходящих анкет в течение дня" },
  { num: "04", title: "Знакомство",         desc: "Выберите лучшую на пробном дне" },
  { num: "05", title: "Работаем!",          desc: "Няня выходит. Есть гарантия замены" },
];

const testimonials = [
  { name: "Екатерина М.", city: "Москва", rating: 5, text: "Нашли нам Анечку за один день! Дочка её обожает. Наконец-то могу работать спокойно.", date: "15 марта 2026", child: "Дочь, 2 года" },
  { name: "Дмитрий и Ольга К.", city: "Москва", rating: 5, text: "Пользуемся год. Меняли нянь дважды — оба раза всё прошло гладко. Отличная команда.", date: "2 апреля 2026", child: "Сын, 4 года" },
  { name: "Наталья Р.", city: "Подмосковье", rating: 5, text: "Боялась доверять ребёнка чужому человеку. Здесь всё прозрачно. Рекомендую всем мамам.", date: "28 марта 2026", child: "Двойняшки, 1.5 года" },
  { name: "Ирина С.", city: "Москва", rating: 4, text: "Хорошая организация, няня пунктуальная и внимательная. Дети довольны.", date: "10 апреля 2026", child: "Дочь, 5 лет" },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 star-rating">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= rating ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--warm-cream)" }}>
      <div className="fixed inset-0 texture-overlay z-0 pointer-events-none" />

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(253,248,242,0.93)", borderBottom: "1px solid rgba(196,99,74,0.12)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--terracotta)" }}>
              <span className="font-display font-bold text-sm text-white">Н</span>
            </div>
            <span className="font-display text-xl font-semibold" style={{ color: "var(--brown-deep)" }}>Надёжная Няня</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {[["Услуги","services"],["Почему мы","why"],["Как работает","how"],["Отзывы","reviews"],["Контакты","contacts"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-sm font-medium" style={{ color: "var(--brown-mid)" }}>{l}</button>
            ))}
          </nav>

          <button onClick={() => scrollTo("form")} className="hidden sm:block btn-primary px-5 py-2.5 rounded-full text-sm font-semibold">
            Подобрать няню
          </button>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden px-4 pb-4 flex flex-col gap-3" style={{ backgroundColor: "var(--warm-cream)" }}>
            {[["Услуги","services"],["Почему мы","why"],["Как работает","how"],["Отзывы","reviews"],["Контакты","contacts"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 text-sm font-medium border-b" style={{ color: "var(--brown-mid)", borderColor: "rgba(196,99,74,0.1)" }}>{l}</button>
            ))}
            <button onClick={() => scrollTo("form")} className="btn-primary w-full py-3 rounded-full text-sm font-semibold mt-1">Подобрать няню</button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
            <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ maskImage: "linear-gradient(to right, transparent, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 35%)" }} />
          </div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, var(--terracotta) 0%, transparent 50%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium" style={{ backgroundColor: "rgba(196,99,74,0.1)", color: "var(--terracotta)" }}>
                <Icon name="ShieldCheck" size={14} />
                Проверено 3 200+ семьями Москвы
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-6" style={{ color: "var(--brown-deep)" }}>
                Надёжный<br />подбор нянь<br /><span style={{ color: "var(--terracotta)" }}>для вашей семьи</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "var(--brown-mid)" }}>
                Подберём проверенного специалиста быстро и безопасно. Няня на час, день или помощница по дому — под ваш график и бюджет.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo("form")} className="btn-primary px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 justify-center">
                  <Icon name="Heart" size={18} />
                  Подобрать няню
                </button>
                <button onClick={() => scrollTo("services")} className="px-8 py-4 rounded-full text-base font-semibold border flex items-center gap-2 justify-center transition-colors hover:bg-white" style={{ borderColor: "var(--terracotta)", color: "var(--terracotta)" }}>
                  Посмотреть услуги
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
              <div className="flex items-center gap-8 mt-12 pt-8" style={{ borderTop: "1px solid rgba(196,99,74,0.15)" }}>
                {[["3 200+","Семей доверились"],["24ч","Срок подбора"],["от 300 ₽","Стоимость/час"]].map(([v,l]) => (
                  <div key={v}>
                    <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--terracotta)" }}>{v}</div>
                    <div className="text-xs sm:text-sm" style={{ color: "var(--brown-mid)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img src={HERO_IMG} alt="Няня с ребёнком" className="w-full h-[520px] object-cover rounded-3xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                      <img src={NANNY_IMG} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--brown-deep)" }}>Анна С.</div>
                      <StarRating rating={5} size={12} />
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-medium" style={{ color: "#6a9e6a" }}>✓ Доступна с завтра</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="py-24" style={{ backgroundColor: "var(--warm-beige)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>Наши преимущества</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: "var(--brown-deep)" }}>Почему выбирают нас</h2>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w, i) => (
              <RevealSection key={i}>
                <div className="card-hover bg-white rounded-2xl p-7 h-full" style={{ boxShadow: "0 4px 20px rgba(61,43,31,0.06)" }}>
                  <div className="guarantee-icon-wrap w-13 h-13 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                    <Icon name={w.icon as "ShieldCheck"} size={22} style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--brown-deep)" }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brown-mid)" }}>{w.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24" style={{ backgroundColor: "var(--warm-cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>Что мы предлагаем</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: "var(--brown-deep)" }}>Услуги</h2>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <RevealSection key={i}>
                <div className="card-hover bg-white rounded-2xl p-7 h-full flex flex-col" style={{ boxShadow: "0 4px 20px rgba(61,43,31,0.06)" }}>
                  <div className="guarantee-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                    <Icon name={s.icon as "Baby"} size={22} style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--brown-deep)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-auto" style={{ color: "var(--brown-mid)" }}>{s.desc}</p>
                  <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(196,99,74,0.1)" }}>
                    <span className="font-semibold text-sm" style={{ color: "var(--terracotta)" }}>{s.price}</span>
                    <button onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })} className="text-xs font-semibold flex items-center gap-1 nav-link" style={{ color: "var(--brown-mid)" }}>
                      Заказать <Icon name="ArrowRight" size={13} />
                    </button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24" style={{ backgroundColor: "var(--warm-beige)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>Просто и прозрачно</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: "var(--brown-deep)" }}>Как это работает</h2>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {steps.map((step, i) => (
              <RevealSection key={i}>
                <div className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[55%] right-[-10%] h-px" style={{ background: "linear-gradient(to right, var(--terracotta), transparent)", opacity: 0.25 }} />
                  )}
                  <div className="font-display text-5xl font-bold mb-3" style={{ color: "rgba(196,99,74,0.12)" }}>{step.num}</div>
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--brown-deep)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brown-mid)" }}>{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div className="rounded-3xl overflow-hidden relative" style={{ height: 340 }}>
              <img src={FAMILY_IMG} alt="Счастливая семья" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(61,43,31,0.72) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 flex items-center px-10 sm:px-16">
                <div className="max-w-md">
                  <h3 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">Первый день — всегда пробный</h3>
                  <p className="mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>Познакомьтесь с няней без обязательств. Не подойдёт — найдём замену бесплатно.</p>
                  <button onClick={() => scrollTo("form")} className="btn-primary px-7 py-3 rounded-full font-semibold text-sm">Начать сейчас</button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24" style={{ backgroundColor: "var(--warm-cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>Реальные родители</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: "var(--brown-deep)" }}>Отзывы</h2>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <RevealSection key={i}>
                <div className="testimonial-card card-hover rounded-2xl p-8" style={{ boxShadow: "0 4px 20px rgba(61,43,31,0.05)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold" style={{ color: "var(--brown-deep)" }}>{t.name}</div>
                      <div className="text-sm" style={{ color: "var(--brown-mid)" }}>{t.city} · {t.child}</div>
                    </div>
                    <StarRating rating={t.rating} />
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--brown-mid)" }}>"{t.text}"</p>
                  <div className="text-xs" style={{ color: "rgba(122,92,71,0.5)" }}>{t.date}</div>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection>
            <div className="mt-10 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 justify-between" style={{ backgroundColor: "rgba(196,99,74,0.07)", border: "1px solid rgba(196,99,74,0.15)" }}>
              <div className="flex items-center gap-4">
                <div className="font-display text-5xl font-bold" style={{ color: "var(--terracotta)" }}>4.9</div>
                <div>
                  <StarRating rating={5} size={20} />
                  <div className="text-sm mt-1" style={{ color: "var(--brown-mid)" }}>На основе 847 отзывов</div>
                </div>
              </div>
              <button onClick={() => scrollTo("form")} className="btn-primary px-8 py-4 rounded-full font-semibold">Оставить заявку</button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="form" className="py-24" style={{ backgroundColor: "var(--terracotta)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(253,248,242,0.65)" }}>Первый шаг</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4">Оставить заявку на подбор</h2>
            <p style={{ color: "rgba(253,248,242,0.82)" }}>Заполните форму и получите подборку нянь уже сегодня</p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10" style={{ boxShadow: "0 30px 80px rgba(61,43,31,0.28)" }}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(196,99,74,0.12)" }}>
                  <Icon name="CheckCircle" size={36} style={{ color: "var(--terracotta)" }} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "var(--brown-deep)" }}>Заявка принята!</h3>
                <p style={{ color: "var(--brown-mid)" }}>Мы перезвоним в течение 15 минут и подберём специалиста.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name",    label: "Ваше имя",    placeholder: "Екатерина",          type: "text" },
                    { key: "phone",   label: "Телефон",     placeholder: "+7 (___) ___-__-__", type: "tel" },
                    { key: "city",    label: "Город",       placeholder: "Москва",             type: "text" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown-deep)" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ border: "1.5px solid rgba(196,99,74,0.2)", backgroundColor: "var(--warm-cream)", color: "var(--brown-deep)" }}
                        onFocus={e => (e.target.style.borderColor = "var(--terracotta)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(196,99,74,0.2)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown-deep)" }}>Выберите услугу</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ border: "1.5px solid rgba(196,99,74,0.2)", backgroundColor: "var(--warm-cream)", color: "var(--brown-mid)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--terracotta)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(196,99,74,0.2)")}
                    >
                      <option value="">Выберите услугу</option>
                      <option>Няня на час</option>
                      <option>Няня на день</option>
                      <option>Ночная няня</option>
                      <option>Помощница по дому</option>
                      <option>Сопровождение</option>
                      <option>Няня + дом</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown-deep)" }}>Возраст ребёнка, график, пожелания</label>
                    <textarea
                      rows={3}
                      placeholder="Например: ребёнок 3 года, нужна няня пн–пт с 9 до 18..."
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ border: "1.5px solid rgba(196,99,74,0.2)", backgroundColor: "var(--warm-cream)", color: "var(--brown-deep)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--terracotta)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(196,99,74,0.2)")}
                    />
                  </div>
                </div>
                {formError && (
                  <p className="mt-4 text-sm text-center font-medium" style={{ color: "#c44" }}>{formError}</p>
                )}
                <button
                  onClick={async () => {
                    if (!form.name.trim() || !form.phone.trim()) {
                      setFormError("Пожалуйста, заполните имя и телефон");
                      return;
                    }
                    setFormError("");
                    setLoading(true);
                    try {
                      const res = await fetch("https://functions.poehali.dev/4f0fb13f-129d-4c91-9561-3ac31c61bf82", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form),
                      });
                      if (res.ok) {
                        setSubmitted(true);
                      } else {
                        const data = await res.json();
                        setFormError(data.error || "Ошибка при отправке. Попробуйте ещё раз.");
                      }
                    } catch {
                      setFormError("Не удалось отправить заявку. Проверьте интернет-соединение.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="w-full mt-6 btn-primary py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <Icon name="Loader" size={18} className="animate-spin" /> : <Icon name="Send" size={18} />}
                  {loading ? "Отправляем..." : "Получить подборку нянь"}
                </button>
                <p className="text-center text-xs mt-4" style={{ color: "var(--brown-mid)" }}>
                  Мы перезвоним в течение 15 минут. Данные не передаём третьим лицам.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24" style={{ backgroundColor: "var(--warm-cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>Свяжитесь с нами</p>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-8" style={{ color: "var(--brown-deep)" }}>Контакты</h2>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                    { icon: "Mail", label: "Email", value: "hello@nadezhnaya-nyanya.ru" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Пречистенка, 17" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–21:00, Сб–Вс 10:00–18:00" },
                  ].map((c,i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="guarantee-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon as "Phone"} size={18} style={{ color: "var(--terracotta)" }} />
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "var(--brown-mid)" }}>{c.label}</div>
                        <div className="font-medium" style={{ color: "var(--brown-deep)" }}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {[["MessageCircle","WhatsApp",false],["Send","Telegram",false],["Phone","Позвонить",true]].map(([icon, label, primary],i) => (
                    <button key={i} className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                      style={{ backgroundColor: primary ? "var(--terracotta)" : "var(--warm-beige)", color: primary ? "white" : "var(--brown-deep)", border: "1px solid rgba(196,99,74,0.2)" }}>
                      <Icon name={icon as "Phone"} size={16} />
                      {label as string}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl flex items-center justify-center" style={{ minHeight: 360, backgroundColor: "var(--warm-beige)", border: "1px solid rgba(196,99,74,0.15)" }}>
                <div className="text-center p-8">
                  <div style={{ color: "rgba(196,99,74,0.3)", marginBottom: 16 }}><Icon name="MapPin" size={48} /></div>
                  <p className="font-display text-xl" style={{ color: "var(--brown-mid)" }}>Карта появится здесь</p>
                  <p className="text-sm mt-2" style={{ color: "rgba(122,92,71,0.5)" }}>Подключите Яндекс.Карты или Google Maps</p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12" style={{ backgroundColor: "var(--brown-deep)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--terracotta)" }}>
                <span className="font-display font-bold text-sm text-white">Н</span>
              </div>
              <span className="font-display text-xl font-semibold text-white">Надёжная Няня</span>
            </div>
            <p className="text-sm text-center" style={{ color: "rgba(253,248,242,0.4)" }}>
              © 2026 Надёжная Няня. Подбор проверенных нянь и помощниц по дому.
            </p>
            <div className="flex gap-6">
              {["Политика","Условия","Карта сайта"].map(l => (
                <button key={l} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(253,248,242,0.4)" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}