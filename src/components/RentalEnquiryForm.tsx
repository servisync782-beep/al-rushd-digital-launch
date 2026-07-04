import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useI18n, COMPANY } from "@/lib/i18n";

export function RentalEnquiryForm({ equipmentName }: { equipmentName?: string }) {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error(t("contact.form.error"));
      return;
    }
    const subject = `Rental Enquiry — ${equipmentName || form.company || form.name}`;
    const body = [
      `${t("contact.form.equipment")}: ${equipmentName || "—"}`,
      `${t("contact.form.name")}: ${form.name}`,
      `${t("contact.form.company")}: ${form.company || "—"}`,
      `${t("contact.form.email")}: ${form.email}`,
      `${t("contact.form.phone")}: ${form.phone}`,
      "",
      `${t("contact.form.message")}:`,
      form.message || "—",
    ].join("\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(t("contact.form.success"));
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
  };

  const field =
    "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm outline-none ring-accent/40 transition focus:ring-2";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
      <h2 className="font-display text-2xl font-bold">{t("common.rentalEnquiry")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("common.rentalEnquirySub")}</p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("contact.form.name")} *</label>
          <input className={field} value={form.name} onChange={set("name")} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("contact.form.company")}</label>
          <input className={field} value={form.company} onChange={set("company")} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("contact.form.email")} *</label>
          <input type="email" className={field} value={form.email} onChange={set("email")} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("contact.form.phone")} *</label>
          <input type="tel" dir="ltr" className={field} value={form.phone} onChange={set("phone")} required />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">{t("contact.form.message")}</label>
          <textarea rows={4} className={field} value={form.message} onChange={set("message")} />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5 sm:col-span-2"
        >
          <Send className="h-4 w-4" />
          {t("contact.form.submit")}
        </button>
      </form>
    </div>
  );
}
