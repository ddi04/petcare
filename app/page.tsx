"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { href: "#services", label: "服务" },
  { href: "#pricing", label: "价格" },
  { href: "#environment", label: "环境" },
  { href: "#contact", label: "门店" }
];

const services = [
  {
    icon: "泡",
    title: "基础洗护",
    body: "温和沐浴、耳道清洁、吹干梳理、脚底毛和指甲基础整理。",
    color: "bg-[var(--mint)]"
  },
  {
    icon: "剪",
    title: "精修造型",
    body: "根据品种、毛量和主人偏好设计造型，兼顾好看和日常打理。",
    color: "bg-[var(--blue)]"
  },
  {
    icon: "护",
    title: "皮毛护理",
    body: "针对干燥、掉毛、毛结、异味等情况，搭配护理浴液和精细梳毛。",
    color: "bg-[var(--gold)]"
  },
  {
    icon: "猫",
    title: "猫咪专场",
    body: "独立安静时段，减少犬只气味干扰，适合胆小和敏感猫咪。",
    color: "bg-[var(--coral)]"
  }
];

const processSteps = [
  ["01", "到店评估", "查看皮肤、毛结、耳朵和情绪状态，确认服务方案。"],
  ["02", "预梳清洁", "先梳开浮毛和毛结，再进入洗护，降低拉扯感。"],
  ["03", "低压洗护", "水温、风力和烘干时间按体型与耐受度调整。"],
  ["04", "交付反馈", "说明护理结果，并给出居家梳毛和皮毛观察建议。"]
];

const prices = [
  {
    tag: "日常清洁",
    title: "基础洗护",
    body: "适合定期洗澡、毛发状态良好的宠物。",
    money: "¥88",
    items: ["洗澡吹干", "耳道清洁", "剪指甲与脚底毛"]
  },
  {
    tag: "人气推荐",
    title: "精修洗护",
    body: "适合需要造型、局部修剪或换季整理的宠物。",
    money: "¥168",
    items: ["基础洗护全套", "脸部与身体造型", "毛结处理建议"],
    featured: true
  },
  {
    tag: "深层护理",
    title: "SPA护理",
    body: "适合皮毛干燥、异味明显或近期掉毛较多的宠物。",
    money: "¥238",
    items: ["护理浴液", "深层梳毛", "护理报告反馈"]
  }
];

const slides = [
  {
    src: "/assets/interior-reception.png",
    alt: "中国高端宠物洗护店接待等候区",
    title: "接待等候区",
    body: "温润木饰面、石材前台与宠物友好等候区，适合到店咨询和服务前评估。"
  },
  {
    src: "/assets/interior-grooming.png",
    alt: "中国高端宠物洗护店洗护操作区",
    title: "洗护操作区",
    body: "独立洗护台、玻璃隔断和专业工具收纳，让护理流程更透明也更高效。"
  },
  {
    src: "/assets/interior-drying.png",
    alt: "中国高端宠物洗护店烘干护理区",
    title: "烘干护理区",
    body: "安静烘干舱与柔和灯光，兼顾皮毛护理、情绪安抚和安全观察。"
  }
];

const reviews = [
  {
    body: "我家比熊很怕吹风，店员一直慢慢哄，最后修出来也很圆润。回家以后没有挠耳朵，挺放心的。",
    name: "豆豆主人"
  },
  {
    body: "猫咪第一次在外面洗澡，约了猫咪专场，环境安静很多。店里会发过程照片，体验感很好。",
    name: "糯米主人"
  },
  {
    body: "金毛掉毛季救星，梳完轻了好多。还提醒我耳朵有点潮，后续护理建议很实用。",
    name: "Lucky主人"
  }
];

const reviewSlides = [
  ...reviews,
  {
    body: "第一次带老年犬来做洗护，店员先问了用药和关节情况，洗的过程中也一直放慢节奏。回家后状态很好，毛也蓬松了很多。",
    name: "奶糖主人"
  },
  {
    body: "之前在别的地方修剪总是两边不对称，这次会先沟通想保留的长度，还给了日常梳毛建议，细节很让人放心。",
    name: "Mochi主人"
  },
  {
    body: "我家小狗特别怕陌生人，工作人员没有急着上手，先陪它熟悉环境。整个过程比想象中顺利，最后还拍了护理前后对比照。",
    name: "可乐主人"
  },
  {
    body: "透明玻璃区可以看到护理过程，烘干时也不是一直猛吹。耳朵和脚底处理得很干净，价格和服务都很匹配。",
    name: "布丁主人"
  },
  {
    body: "猫咪毛结比较严重，本来担心会剃得很丑，结果处理得很耐心，还保留了自然的形状。后续护理说明写得很清楚。",
    name: "团子主人"
  },
  {
    body: "预约时间控制得很好，到店不用等太久。洗完身上香味很淡，不刺鼻，摸起来清爽柔软，已经准备固定来了。",
    name: "阿福主人"
  }
];

function Header() {
  return (
    <header className="sticky top-0 z-10 flex min-h-[68px] items-center justify-between gap-6 border-b border-[rgba(223,230,226,0.78)] bg-[rgba(255,253,248,0.92)] px-[6vw] backdrop-blur-xl max-sm:min-h-[62px] max-sm:px-[18px]">
      <a className="flex items-center gap-2.5 whitespace-nowrap font-extrabold" href="#">
        <span className="grid size-[38px] place-items-center rounded-full bg-[var(--mint)] text-xl text-white">
          爪
        </span>
        <span className="max-sm:text-[15px]">暖爪宠物洗护店</span>
      </a>
      <nav
        aria-label="主导航"
        className="flex items-center gap-[22px] text-[15px] text-[var(--muted)]"
      >
        {navItems.map((item) => (
          <a className="max-[980px]:hidden" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--coral)] px-5 font-bold text-white shadow-[0_12px_28px_rgba(238,128,107,0.28)] transition-transform hover:-translate-y-0.5 max-sm:min-h-[38px] max-sm:px-3 max-sm:text-[13px]"
          href="#booking"
        >
          立即预约
        </a>
      </nav>
    </header>
  );
}

function BookingForm({ onBooked }: { onBooked: () => void }) {
  const [defaultArrivalTime] = useState(getDefaultArrivalTime);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    onBooked();
  }

  return (
    <form
      className="w-full max-w-[440px] rounded-lg border border-[var(--line)] bg-white p-[26px] shadow-[0_18px_50px_rgba(31,42,46,0.12)]"
      onSubmit={handleSubmit}
    >
      <h2 className="m-0 text-2xl font-bold leading-tight">快速预约</h2>
      <p className="mb-[22px] mt-2 text-[var(--muted)]">
        留下信息后，店员会在营业时间内与你确认宠物体型、毛量和到店时间。
      </p>
      <div className="grid gap-3.5">
        <Field label="主人姓名">
          <input name="name" placeholder="例如：林小姐" required type="text" />
        </Field>
        <Field label="联系电话">
          <input name="phone" placeholder="请输入手机号" required type="tel" />
        </Field>
        <Field label="宠物类型">
          <select defaultValue="" name="pet" required>
            <option value="">请选择</option>
            <option>小型犬</option>
            <option>中大型犬</option>
            <option>猫咪</option>
            <option>多宠家庭</option>
          </select>
        </Field>
        <Field label="想预约的服务">
          <select defaultValue="" name="service" required>
            <option value="">请选择</option>
            <option>基础洗护</option>
            <option>精修造型</option>
            <option>深层SPA</option>
            <option>皮毛护理</option>
          </select>
        </Field>
        <Field label="期望到店时间">
          <input
            defaultValue={defaultArrivalTime}
            name="arrivalTime"
            required
            type="datetime-local"
          />
        </Field>
        <Field label="备注">
          <textarea name="note" placeholder="例如：怕吹风、容易紧张、需要剪指甲" />
        </Field>
        <button
          className="mt-1.5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--coral)] px-5 font-bold text-white shadow-[0_12px_28px_rgba(238,128,107,0.28)] transition-transform hover:-translate-y-0.5"
          type="submit"
        >
          提交预约
        </button>
      </div>
    </form>
  );
}

function getDefaultArrivalTime() {
  const arrivalTime = new Date();
  arrivalTime.setDate(arrivalTime.getDate() + 1);
  arrivalTime.setHours(9, 30, 0, 0);

  const year = arrivalTime.getFullYear();
  const month = String(arrivalTime.getMonth() + 1).padStart(2, "0");
  const day = String(arrivalTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T09:30`;
}

function Field({
  children,
  label
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-[7px] text-sm font-bold text-[#3d4b4f] [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-[var(--line)] [&_input]:bg-[#fbfcfa] [&_input]:px-3 [&_input]:py-[11px] [&_input]:text-[var(--ink)] [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-[var(--line)] [&_select]:bg-[#fbfcfa] [&_select]:px-3 [&_select]:py-[11px] [&_select]:text-[var(--ink)] [&_textarea]:min-h-[86px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[var(--line)] [&_textarea]:bg-[#fbfcfa] [&_textarea]:px-3 [&_textarea]:py-[11px] [&_textarea]:text-[var(--ink)]">
      {label}
      {children}
    </label>
  );
}

function EnvironmentCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function showSlide(index: number) {
    setCurrentSlide((index + slides.length) % slides.length);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div
        aria-label="店内环境轮播图"
        className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[#172124] shadow-[0_18px_50px_rgba(31,42,46,0.12)]"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <article
              className="relative min-h-[560px] flex-[0_0_100%] max-[980px]:min-h-[440px] max-sm:min-h-[360px]"
              key={slide.title}
            >
              <Image
                alt={slide.alt}
                className="h-[560px] w-full object-cover max-[980px]:h-[440px] max-sm:h-[360px]"
                height={900}
                src={slide.src}
                width={1400}
              />
              <div className="absolute bottom-7 left-7 max-w-[min(520px,calc(100%_-_56px))] rounded-lg bg-[rgba(23,33,36,0.72)] px-5 py-[18px] text-white backdrop-blur-[10px] max-sm:inset-x-3.5 max-sm:bottom-3.5 max-sm:max-w-none max-sm:p-3.5">
                <h3 className="mb-1.5 mt-0 text-2xl font-bold leading-tight max-sm:text-[19px]">
                  {slide.title}
                </h3>
                <p className="m-0 text-[rgba(255,255,255,0.78)]">{slide.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div
          aria-label="轮播控制"
          className="absolute bottom-6 right-[22px] z-[2] flex gap-2.5 max-sm:bottom-auto max-sm:right-3.5 max-sm:top-3.5"
        >
          <button
            aria-label="上一张"
            className="grid size-[42px] cursor-pointer place-items-center rounded-full border border-[rgba(255,255,255,0.58)] bg-[rgba(31,42,46,0.58)] text-white"
            onClick={() => showSlide(currentSlide - 1)}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="下一张"
            className="grid size-[42px] cursor-pointer place-items-center rounded-full border border-[rgba(255,255,255,0.58)] bg-[rgba(31,42,46,0.58)] text-white"
            onClick={() => showSlide(currentSlide + 1)}
            type="button"
          >
            ›
          </button>
        </div>
      </div>
      <div aria-label="轮播页码" className="mt-[18px] flex justify-center gap-[9px]">
        {slides.map((slide, index) => (
          <button
            aria-label={`显示${slide.title}`}
            className={`h-1 w-[34px] cursor-pointer rounded-full border-0 ${
              index === currentSlide ? "bg-[var(--mint)]" : "bg-[#cfd9d4]"
            }`}
            key={slide.title}
            onClick={() => showSlide(index)}
            type="button"
          />
        ))}
      </div>
    </>
  );
}

function ReviewCarousel() {
  const pages = useMemo(() => {
    const grouped = [];

    for (let index = 0; index < reviewSlides.length; index += 3) {
      grouped.push(reviewSlides.slice(index, index + 3));
    }

    return grouped;
  }, []);
  const [currentPage, setCurrentPage] = useState(0);

  function showPage(index: number) {
    setCurrentPage((index + pages.length) % pages.length);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentPage((page) => (page + 1) % pages.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [pages.length]);

  return (
    <div className="relative">
      <div
        aria-label="顾客评价轮播"
        className="overflow-hidden"
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div
              className="grid flex-[0_0_100%] grid-cols-3 gap-[18px] pr-px max-[980px]:grid-cols-2 max-sm:grid-cols-1"
              key={`review-page-${pageIndex}`}
            >
              {page.map((review, reviewIndex) => (
                <article
                  className="flex min-h-[260px] flex-col justify-between rounded-lg border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_34px_rgba(31,42,46,0.06)]"
                  key={review.name}
                >
                  <div>
                    <div className="mb-3 text-lg tracking-[2px] text-[var(--gold)]">★★★★★</div>
                    <p className="m-0 text-[var(--muted)]">{review.body}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-[#e5f2ed] text-sm font-extrabold text-[#2f7665]">
                      {reviewIndex + pageIndex * 3 + 1}
                    </span>
                    <strong className="m-0 text-xl">{review.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
        <div className="flex gap-2.5 max-sm:justify-center">
          {pages.map((_, index) => (
            <button
              aria-label={`显示第 ${index + 1} 组评价`}
              className={`h-1.5 w-10 cursor-pointer rounded-full border-0 transition-colors ${
                index === currentPage ? "bg-[var(--mint)]" : "bg-[#cfd9d4]"
              }`}
              key={`review-dot-${index}`}
              onClick={() => showPage(index)}
              type="button"
            />
          ))}
        </div>
        <div className="flex gap-2.5 max-sm:justify-center">
          <button
            aria-label="上一组评价"
            className="grid size-[42px] cursor-pointer place-items-center rounded-full border border-[var(--line)] bg-white text-xl text-[var(--ink)] shadow-[0_10px_24px_rgba(31,42,46,0.08)]"
            onClick={() => showPage(currentPage - 1)}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="下一组评价"
            className="grid size-[42px] cursor-pointer place-items-center rounded-full border border-[var(--line)] bg-white text-xl text-[var(--ink)] shadow-[0_10px_24px_rgba(31,42,46,0.08)]"
            onClick={() => showPage(currentPage + 1)}
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ show }: { show: boolean }) {
  return (
    <div
      className={`fixed bottom-[22px] right-[22px] z-20 max-w-[min(360px,calc(100vw_-_44px))] rounded-lg bg-[var(--mint)] px-[18px] py-4 text-white shadow-[0_18px_50px_rgba(31,42,46,0.12)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-[140%]"
      }`}
    >
      预约已提交，我们会尽快联系你确认时间。
    </div>
  );
}

function SectionTitle({ body, title }: { body: string; title: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-[30px] max-sm:block">
      <h2 className="m-0 text-[32px] font-bold leading-tight">{title}</h2>
      <p className="m-0 max-w-[620px] text-[var(--muted)] max-sm:mt-3">{body}</p>
    </div>
  );
}

export default function Home() {
  const [showToast, setShowToast] = useState(false);

  function handleBooked() {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2800);
  }

  return (
    <>
      <Header />
      <section
        className="grid min-h-[calc(100vh-68px)] grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] items-center gap-14 px-[6vw] py-[8vh] pb-[7vh] max-[980px]:grid-cols-1 max-sm:min-h-0 max-sm:px-[18px] max-sm:py-[58px]"
        style={{
          background:
            'linear-gradient(110deg, rgba(255, 253, 248, 0.96) 0%, rgba(255, 253, 248, 0.8) 46%, rgba(244, 248, 242, 0.9) 100%), url("https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=82") center right / cover'
        }}
      >
        <div>
          <span className="mb-[18px] inline-flex items-center gap-2 text-sm font-extrabold text-[#2f7665] before:block before:h-0.5 before:w-8 before:bg-[var(--mint)]">
            猫狗洗护 · 修剪造型 · SPA护理
          </span>
          <h1 className="m-0 max-w-[680px] text-[clamp(42px,7vw,82px)] font-bold leading-[1.02]">
            让每一次洗澡，都像被温柔接住。
          </h1>
          <p className="mb-[30px] mt-6 max-w-[600px] text-lg text-[var(--muted)] max-sm:text-base">
            暖爪为猫咪和狗狗提供一对一低压洗护服务。每只宠物到店时，我们都会认真留意它的情绪、皮肤和毛发状态，清洁、梳理和烘干也会按它能接受的节奏来；怕水、怕吹风或第一次到店的毛孩子，都值得被温柔地等一等。温和洗护产品、独立烘干区和透明护理反馈，让它们干净舒服，也让主人真正放心。
          </p>
          <div className="mb-[34px] flex flex-wrap gap-3.5">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--coral)] px-5 font-bold text-white shadow-[0_12px_28px_rgba(238,128,107,0.28)] transition-transform hover:-translate-y-0.5"
              href="#booking"
            >
              预约洗护
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--line)] bg-white px-5 font-bold text-[var(--ink)] transition-transform hover:-translate-y-0.5"
              href="tel:400-886-0520"
            >
              电话咨询
            </a>
          </div>
          <div
            aria-label="门店数据"
            className="grid max-w-[600px] grid-cols-3 gap-3.5 max-sm:grid-cols-1"
          >
            {[
              ["4.9", "顾客评分"],
              ["30min", "到店评估内完成"],
              ["8年", "洗护师经验"]
            ].map(([value, label]) => (
              <div
                className="rounded-lg border border-[rgba(223,230,226,0.8)] bg-[rgba(255,255,255,0.76)] p-4"
                key={label}
              >
                <strong className="block text-2xl leading-tight">{value}</strong>
                <span className="text-[13px] text-[var(--muted)]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex min-h-[560px] items-end justify-center self-stretch max-[980px]:min-h-0 max-[980px]:justify-start"
          id="booking"
        >
          <BookingForm onBooked={handleBooked} />
        </div>
      </section>

      <main>
        <section className="bg-white px-[6vw] py-[82px] max-sm:px-[18px]" id="services">
          <SectionTitle
            body="从日常清洁到换季护理，按宠物状态匹配合适流程。每次服务前都会先做皮肤、耳道、趾甲和毛结检查。"
            title="常用服务"
          />
          <div className="grid grid-cols-4 gap-[18px] max-[980px]:grid-cols-2 max-sm:grid-cols-1">
            {services.map((service) => (
              <article
                className="min-h-60 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-[22px]"
                key={service.title}
              >
                <div
                  className={`mb-[18px] grid size-12 place-items-center rounded-lg text-2xl text-white ${service.color}`}
                >
                  {service.icon}
                </div>
                <h3 className="m-0 text-xl font-bold">{service.title}</h3>
                <p className="text-[var(--muted)]">{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[var(--soft)] px-[6vw] py-[82px] max-sm:px-[18px]">
          <SectionTitle
            body="透明流程比速度更重要。我们会根据宠物情绪调整节奏，尽量减少强迫和刺激。"
            title="护理流程"
          />
          <div className="grid grid-cols-4 overflow-hidden rounded-lg border border-[var(--line)] bg-white max-[980px]:grid-cols-2 max-sm:grid-cols-1">
            {processSteps.map(([number, title, body], index) => (
              <article
                className={`min-h-[170px] p-[26px] ${
                  index !== processSteps.length - 1
                    ? "border-r border-[var(--line)] max-sm:border-b max-sm:border-r-0"
                    : ""
                } ${index === 1 ? "max-[980px]:border-r-0" : ""}`}
                key={number}
              >
                <b className="text-sm text-[var(--coral)]">{number}</b>
                <h3 className="mb-2 mt-3 text-[19px] font-bold">{title}</h3>
                <p className="m-0 text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-[6vw] py-[82px] max-sm:px-[18px]" id="pricing">
          <SectionTitle
            body="价格会根据体型、毛量、毛结程度浮动；以下为常见参考价，到店评估后确认。"
            title="价格套餐"
          />
          <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-sm:grid-cols-1">
            {prices.map((price) => (
              <article
                className={`relative overflow-hidden rounded-lg border bg-[var(--paper)] p-[26px] ${
                  price.featured
                    ? "border-[rgba(107,182,157,0.7)] shadow-[0_18px_50px_rgba(31,42,46,0.12)]"
                    : "border-[var(--line)]"
                }`}
                key={price.title}
              >
                <span className="mb-4 inline-flex rounded-full bg-[#e5f2ed] px-2.5 py-1 text-[13px] font-extrabold text-[#2f7665]">
                  {price.tag}
                </span>
                <h3 className="m-0 text-xl font-bold">{price.title}</h3>
                <p className="text-[var(--muted)]">{price.body}</p>
                <div className="my-4 text-[42px] font-black leading-none">
                  {price.money} <small className="text-[15px] font-medium text-[var(--muted)]">起</small>
                </div>
                <ul className="m-0 mt-[18px] list-none p-0 text-[var(--muted)]">
                  {price.items.map((item) => (
                    <li className="border-t border-[rgba(223,230,226,0.7)] py-2" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f9fbf7] px-[6vw] py-[82px] max-sm:px-[18px]" id="environment">
          <SectionTitle
            body="三张环境图均由 AI 绘制，展示中国高端宠物洗护店的不同区域：接待等候、洗护操作、烘干护理。"
            title="店内环境"
          />
          <EnvironmentCarousel />
        </section>

        <section className="bg-white px-[6vw] py-[82px] max-sm:px-[18px]" id="reviews">
          <SectionTitle
            body="好看的造型当然重要，但毛孩子愿意再来，才是我们更在意的事。"
            title="顾客口碑"
          />
          <ReviewCarousel />
        </section>

        <section
          className="grid grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] items-center gap-10 bg-[var(--ink)] px-[6vw] py-[82px] text-white max-[980px]:grid-cols-1 max-sm:px-[18px]"
          id="contact"
        >
          <div>
            <h2 className="m-0 text-[32px] font-bold leading-tight">来店前，先给毛孩子留个安静时段。</h2>
            <p className="text-[rgba(255,255,255,0.72)]">
              为保证每只宠物都有足够护理时间，建议提前预约。老年犬、幼猫幼犬、皮肤敏感宠物请提前说明。
            </p>
            <div className="mt-[26px] grid gap-3.5">
              {[
                ["地址", "长沙市天心区万家丽南路88号"],
                ["营业", "周一至周日 10:00 - 20:30"],
                ["电话", "400-886-0520"]
              ].map(([label, value]) => (
                <div
                  className="flex items-start gap-3 border-b border-[rgba(255,255,255,0.16)] pb-3.5"
                  key={label}
                >
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-[var(--soft)] shadow-[0_18px_50px_rgba(31,42,46,0.12)]">
            <Image
              alt="暖爪宠物洗护店长沙市天心区万家丽南路88号地图位置示意"
              className="h-auto min-h-[360px] w-full object-cover"
              height={820}
              src="/assets/changsha-location-map-ai.png"
              width={900}
            />
          </div>
        </section>
      </main>

      <footer className="flex justify-between gap-5 bg-[#172124] px-[6vw] py-6 text-sm text-[var(--muted)] max-sm:block max-sm:px-[18px] max-sm:py-[22px]">
        <span>© 2026 暖爪宠物洗护店</span>
        <span>专业洗护 · 温柔护理 · 预约优先</span>
      </footer>
      <Toast show={showToast} />
    </>
  );
}
