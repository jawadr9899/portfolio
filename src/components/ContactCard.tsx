import { type ContactLink } from "../store";

export default function ContactCard({ link }: { link: ContactLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group block p-7 border-r border-b border-[#222] no-underline transition-colors duration-200 hover:bg-[#FAFAFA]"
    >
      <p className="font-sans font-medium text-[10px] text-[#444] group-hover:text-[#999] tracking-[0.1em] uppercase mb-2.5 transition-colors duration-200">
        {link.label}
      </p>
      <p className="font-sans text-[13.5px] font-light text-[#AAA] group-hover:text-black mb-1.5 transition-colors duration-200 break-all leading-snug flex items-center">
        {link.value}
        <span className="ml-1 opacity-0 group-hover:opacity-100 font-normal transition-opacity">↗</span>
      </p>
      <p className="font-sans text-[13px] font-light text-[#fff] group-hover:text-[#111] tracking-wide transition-colors duration-200">
        {link.note}
      </p>
    </a>
  );
}
