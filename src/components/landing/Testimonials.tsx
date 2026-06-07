import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "They built a four-storey period interior in eight weeks and made it look like it had stood for two hundred years. Extraordinary discipline.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    name: "Eleanor Whitfield",
    role: "Production Designer, BBC Studios",
  },
  {
    text: "Calm under pressure, brilliant on the floor. Construct Scenery is the team I call first on every commercial.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    name: "Marcus Bellamy",
    role: "Executive Producer, RSA Films",
  },
  {
    text: "The fabrication detail on our hero set was indistinguishable from the real thing in 8K. Truly camera-ready craft.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    name: "Priya Anand",
    role: "Art Director, Netflix",
  },
  {
    text: "From sketch to install in six weeks across three sites. Their delivery model is in a class of its own.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    name: "James Hollis",
    role: "Creative Director, AMV BBDO",
  },
  {
    text: "The standby crew quietly solved problems we hadn't even spotted. That's the kind of partnership you want on a long shoot.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    name: "Sofia Marquez",
    role: "Production Designer, Sky Originals",
  },
  {
    text: "Sustainable, beautifully made, on schedule. We've worked with most UK shops — these are the ones we keep returning to.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    name: "Oliver Bennet",
    role: "Head of Production, Channel 4",
  },
  {
    text: "Our experiential build needed sculptural precision and theatrical flair. They delivered both, calmly.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    name: "Hannah Reeves",
    role: "ECD, Jack Morton Worldwide",
  },
  {
    text: "I trust them with the riskiest creative I write. They make the impossible feel scheduled.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop",
    name: "Daniel Fox",
    role: "Director, Independent",
  },
  {
    text: "Beautifully detailed finishes on a brutal turnaround. The DOP was thrilled. So were we.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    name: "Amelia Park",
    role: "Production Designer, ITV Drama",
  },
];

const first = testimonials.slice(0, 3);
const second = testimonials.slice(3, 6);
const third = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-background py-32 md:py-40 relative overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Testimonials</p>
          <h2 className="font-display text-5xl md:text-6xl text-balance leading-[1.0]">
            What industry leaders say.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed">
            The people behind award-winning productions trust Construct Scenery to deliver
            exceptional results under demanding timelines.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={first} duration={18} />
          <TestimonialsColumn testimonials={second} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={third} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
}
