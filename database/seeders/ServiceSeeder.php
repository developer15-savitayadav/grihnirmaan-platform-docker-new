<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'government-approvals',
                'name' => 'Government Approvals',
                'icon_name' => 'FileCheck',
                'short_description' => 'End-to-end LDA, Nagar Nigam & RERA approvals — handled by our liaison team.',
                'long_description' => 'Navigating Indian construction approvals can take months. Our in-house liaison team handles map sanctioning, building plan approval, completion certificate, and all statutory clearances so you can focus on your dream home.',
                'process_steps' => [
                    ['title' => 'Document Audit', 'description' => 'We review your land papers, NOCs, and existing approvals.'],
                    ['title' => 'Application & Liaison', 'description' => 'Our team files & follows up with LDA, Nagar Nigam, and other authorities.'],
                    ['title' => 'Sanction Delivery', 'description' => 'You receive sanctioned plans and statutory clearances, ready to build.'],
                ],
                'faqs' => [
                    ['q' => 'How long do approvals usually take?', 'a' => 'Typically 6–10 weeks for LDA in Lucknow, depending on plot size and zone.'],
                    ['q' => 'Do I need to visit the offices myself?', 'a' => 'No — we handle all visits. You only sign the necessary papers at your convenience.'],
                    ['q' => 'What if my plot is in a non-LDA area?', 'a' => 'We also handle Nagar Nigam, Gram Panchayat, and Awas Vikas approvals across UP.'],
                ],
                'display_order' => 1,
            ],
            [
                'slug' => 'civil-construction',
                'name' => 'Civil Construction',
                'icon_name' => 'Hammer',
                'short_description' => 'RCC structure, brickwork, plastering — built with ISI-grade materials and seismic-zone-IV compliance.',
                'long_description' => 'From foundation to slab, every structural element is engineered for Lucknow’s seismic zone with M25-M30 grade concrete, Fe-500 TMT bars, and AAC blocks for thermal efficiency.',
                'process_steps' => [
                    ['title' => 'Site Preparation', 'description' => 'Excavation, soil testing, anti-termite treatment.'],
                    ['title' => 'RCC & Masonry', 'description' => 'Foundation, columns, beams, slabs, and brickwork by certified crews.'],
                    ['title' => 'Plastering & Curing', 'description' => '14-day curing cycle and finish-ready plastering for paint or texture.'],
                ],
                'faqs' => [
                    ['q' => 'What grade of cement and steel do you use?', 'a' => 'UltraTech / ACC PPC cement and Tata Tiscon / SAIL Fe-500 TMT bars by default.'],
                    ['q' => 'Will I get progress photos?', 'a' => 'Yes, weekly photo reports and a live WhatsApp group with your site supervisor.'],
                    ['q' => 'How long does construction take?', 'a' => 'A typical 1500 sq ft G+1 home takes 7–9 months from foundation to handover.'],
                ],
                'display_order' => 2,
            ],
            [
                'slug' => 'architecture-design',
                'name' => 'Architecture & Design',
                'icon_name' => 'Compass',
                'short_description' => 'Vastu-compliant 3D designs by IIA-registered architects — unlimited revisions until you say yes.',
                'long_description' => 'Our architects create floor plans, 3D elevations, and walkthrough renders tailored to your plot, budget, and lifestyle — fully Vastu-compliant on request.',
                'process_steps' => [
                    ['title' => 'Discovery & Plot Study', 'description' => 'Site visit, plot dimensions, family needs, and Vastu preferences.'],
                    ['title' => '2D Plans & 3D Elevation', 'description' => 'Multiple options with unlimited revisions until you finalise.'],
                    ['title' => 'Working Drawings', 'description' => 'Detailed structural, electrical, and plumbing drawings for execution.'],
                ],
                'faqs' => [
                    ['q' => 'Will I see 3D renders before construction?', 'a' => 'Yes — photorealistic 3D walkthroughs included in every package.'],
                    ['q' => 'Can you make my home Vastu-compliant?', 'a' => 'Absolutely. Our architects work alongside Vastu consultants on request.'],
                    ['q' => 'Are revisions limited?', 'a' => 'No — unlimited revisions until you sign off on the final design.'],
                ],
                'display_order' => 3,
            ],
            [
                'slug' => 'interior-design',
                'name' => 'Interior Design',
                'icon_name' => 'Sofa',
                'short_description' => 'Modular kitchens, wardrobes, false ceilings, and turnkey interiors — done in 60 days.',
                'long_description' => 'From modular kitchens with Hettich/Hafele fittings to gypsum false ceilings and TV units, we deliver factory-finished interiors in 60 days flat.',
                'process_steps' => [
                    ['title' => 'Mood Board & 3D', 'description' => 'Material selection, colour palette, and 3D room renders.'],
                    ['title' => 'Factory Manufacturing', 'description' => 'Modular units fabricated off-site for precision and speed.'],
                    ['title' => 'On-Site Installation', 'description' => 'Quick assembly with minimal mess — typically 7–10 days per home.'],
                ],
                'faqs' => [
                    ['q' => 'Do you cover full home or just kitchen?', 'a' => 'Both. Choose room-wise (kitchen / wardrobe) or full-home turnkey packages.'],
                    ['q' => 'What warranty do I get?', 'a' => '5 years on modular hardware (Hettich/Hafele) and 1 year on finishes.'],
                    ['q' => 'Can I see the materials in person?', 'a' => 'Yes, visit our Hazratganj experience centre or we’ll bring samples to your site.'],
                ],
                'display_order' => 4,
            ],
            [
                'slug' => 'electrical-works',
                'name' => 'Electrical Works',
                'icon_name' => 'Zap',
                'short_description' => 'Concealed wiring, ELCB protection, and Havells switches — IS:732 compliant throughout.',
                'long_description' => 'Premium Havells modular switches, Polycab/Finolex copper wiring, ELCB safety, and pre-wired CCTV/networking points — installed by licensed electricians.',
                'process_steps' => [
                    ['title' => 'Load Calculation', 'description' => 'Room-wise load planning and DB sizing for safety.'],
                    ['title' => 'Concealed Wiring', 'description' => 'ISI-marked PVC conduits with Polycab/Finolex copper cables.'],
                    ['title' => 'Fixture & DB Installation', 'description' => 'Havells modular switches, MCBs, ELCB, and full earthing.'],
                ],
                'faqs' => [
                    ['q' => 'Which brand of switches do you use?', 'a' => 'Havells Crabtree / Modular as standard; upgrades available on request.'],
                    ['q' => 'Is the wiring concealed or surface?', 'a' => 'All wiring is concealed in ISI conduits as per IS:732.'],
                    ['q' => 'Do you provide CCTV and networking?', 'a' => 'Yes, we pre-wire Cat6 LAN and CCTV cabling at every required point.'],
                ],
                'display_order' => 5,
            ],
            [
                'slug' => 'bath-fittings-plumbing',
                'name' => 'Bath Fittings & Plumbing',
                'icon_name' => 'Droplets',
                'short_description' => 'Jaquar/Kohler fittings, leak-proof CPVC plumbing, and 5-year warranty on workmanship.',
                'long_description' => 'Concealed CPVC supply lines, PVC drainage, premium Jaquar or Kohler bath fittings, and pressure-tested water systems with 5-year workmanship warranty.',
                'process_steps' => [
                    ['title' => 'Plumbing Layout', 'description' => 'Hot/cold water lines, drainage, and overhead/UG tank planning.'],
                    ['title' => 'Concealed Piping', 'description' => 'Ashirvad / Astral CPVC pipes pressure-tested before tiling.'],
                    ['title' => 'Fixture Installation', 'description' => 'Jaquar / Kohler taps, showers, sanitaryware, and water heaters.'],
                ],
                'faqs' => [
                    ['q' => 'Which sanitaryware brands?', 'a' => 'Jaquar (standard), Kohler / Hindware Italian (premium).'],
                    ['q' => 'How is leak prevention guaranteed?', 'a' => 'All concealed lines are pressure-tested for 24 hours before tile work begins.'],
                    ['q' => 'Do you cover RO and water purifier installation?', 'a' => 'Yes, including under-counter RO points and dedicated drainage.'],
                ],
                'display_order' => 6,
            ],
            [
                'slug' => 'glass-glazing',
                'name' => 'Glass & Glazing',
                'icon_name' => 'Square',
                'short_description' => 'UPVC windows, toughened glass railings, and frameless shower enclosures — IGBC-rated for thermal efficiency.',
                'long_description' => 'Energy-efficient UPVC and aluminium glazing systems with double/triple glazed units, toughened balcony railings, and frameless shower enclosures.',
                'process_steps' => [
                    ['title' => 'Measurement & Design', 'description' => 'Site survey, opening sizing, and section selection.'],
                    ['title' => 'Factory Fabrication', 'description' => 'UPVC / aluminium frames cut and welded in our factory.'],
                    ['title' => 'On-Site Installation', 'description' => 'Frame fixing, glass placement, and silicon sealing.'],
                ],
                'faqs' => [
                    ['q' => 'UPVC or aluminium — which is better?', 'a' => 'UPVC for thermal/sound insulation; aluminium for slimmer profiles.'],
                    ['q' => 'Are the windows soundproof?', 'a' => 'Double-glazed UPVC windows reduce external noise by ~30 dB.'],
                    ['q' => 'What is the warranty?', 'a' => '10 years on UPVC profiles, 2 years on hardware.'],
                ],
                'display_order' => 7,
            ],
            [
                'slug' => 'painting-finishing',
                'name' => 'Painting & Finishing',
                'icon_name' => 'PaintBucket',
                'short_description' => 'Asian Paints royale finish, anti-fungal primers, and texture/wallpaper options.',
                'long_description' => 'Multi-coat painting with Asian Paints / Berger primers and emulsions, including anti-fungal exterior coats, texture finishes, and premium wallpapers.',
                'process_steps' => [
                    ['title' => 'Surface Prep', 'description' => 'Putty application, sanding, and primer coat.'],
                    ['title' => 'Multi-Coat Painting', 'description' => '2 coats of Asian Paints emulsion; exterior gets anti-fungal weather-shield.'],
                    ['title' => 'Touch-up & Handover', 'description' => 'Final inspection, touch-ups, and 1-year colour warranty.'],
                ],
                'faqs' => [
                    ['q' => 'Which paint brand do you use?', 'a' => 'Asian Paints by default — Berger / Dulux on request.'],
                    ['q' => 'How long does the paint last?', 'a' => '7–10 years for interiors, 5–7 years for exteriors with weather-shield.'],
                    ['q' => 'Can I choose textures or wallpapers?', 'a' => 'Yes, we offer over 200 textures and curated wallpaper collections.'],
                ],
                'display_order' => 8,
            ],
            [
                'slug' => 'bhumi-poojan',
                'name' => 'Bhumi Poojan',
                'icon_name' => 'Sparkles',
                'short_description' => 'Auspicious foundation ceremony — pandit, samagri, and full arrangement included.',
                'long_description' => 'A complete Bhumi Poojan service for the auspicious start of construction — verified pandit, all puja samagri, muhurat consultation, and family-friendly arrangement.',
                'process_steps' => [
                    ['title' => 'Muhurat Consultation', 'description' => 'Pick the most auspicious date and time for your family.'],
                    ['title' => 'Samagri Arrangement', 'description' => 'Complete puja kit including havan samagri, idols, and prasad.'],
                    ['title' => 'Ceremony Execution', 'description' => 'Verified pandit conducts the puja; we handle setup and cleanup.'],
                ],
                'faqs' => [
                    ['q' => 'Do you arrange the pandit?', 'a' => 'Yes, an experienced Sanskrit-speaking pandit is part of the package.'],
                    ['q' => 'Is the muhurat customised?', 'a' => 'Yes, based on your family’s birth charts and Vedic calendar.'],
                    ['q' => 'How many guests can attend?', 'a' => 'No limit — we provide seating, water, and prasad for up to 50 guests.'],
                ],
                'display_order' => 9,
            ],
            [
                'slug' => 'grih-pravesh',
                'name' => 'Grih Pravesh',
                'icon_name' => 'Home',
                'short_description' => 'Housewarming ceremony with pandit, kalash yatra, havan, and family blessings.',
                'long_description' => 'A traditional Vastu-compliant Grih Pravesh service — kalash yatra, navagraha shanti, havan, and house blessing ceremony complete with prasad and decoration.',
                'process_steps' => [
                    ['title' => 'Pre-Ceremony Setup', 'description' => 'Decoration, mandap, kalash, and havan kund arrangement.'],
                    ['title' => 'Kalash Yatra & Havan', 'description' => 'Traditional procession, navagraha shanti, and main havan.'],
                    ['title' => 'Blessing & Prasad', 'description' => 'House blessing, family aarti, and prasad distribution.'],
                ],
                'faqs' => [
                    ['q' => 'Do you handle decoration?', 'a' => 'Yes, traditional flower & rangoli decoration included.'],
                    ['q' => 'Can I customise the rituals?', 'a' => 'Absolutely — rituals can be tailored to your tradition and family customs.'],
                    ['q' => 'How long does the ceremony last?', 'a' => '3–4 hours including kalash yatra, havan, and prasad.'],
                ],
                'display_order' => 10,
            ],
            [
                'slug' => 'home-loan-facilitation',
                'name' => 'Home Loan Facilitation',
                'icon_name' => 'Banknote',
                'short_description' => 'Pre-approved loans from SBI, HDFC, ICICI — with the lowest rate guarantee for our clients.',
                'long_description' => 'Tied up with 12+ banks and NBFCs, we get you the best home/construction loan rates, handle paperwork end-to-end, and ensure quick disbursal.',
                'process_steps' => [
                    ['title' => 'Eligibility Check', 'description' => 'Free CIBIL pull and loan-eligibility assessment within 24 hours.'],
                    ['title' => 'Bank Matchmaking', 'description' => 'Compare offers from SBI, HDFC, ICICI, LIC HFL & more.'],
                    ['title' => 'Disbursal Support', 'description' => 'Documentation, valuation, and stage-wise disbursal coordination.'],
                ],
                'faqs' => [
                    ['q' => 'Which banks do you work with?', 'a' => 'SBI, HDFC, ICICI, Axis, LIC HFL, Bajaj Housing, and 6 more.'],
                    ['q' => 'Is there a service charge?', 'a' => 'No — banks pay our facilitation fee, not you.'],
                    ['q' => 'How long does loan approval take?', 'a' => 'Typically 7–14 working days from document submission.'],
                ],
                'display_order' => 11,
            ],
            [
                'slug' => 'vastu-consultation',
                'name' => 'Vastu Consultation',
                'icon_name' => 'Compass',
                'short_description' => 'Plot-direction analysis, room placement, and remedial guidance by certified Vastu experts.',
                'long_description' => 'Our certified Vastu consultants analyse your plot direction, recommend optimal room placements, and provide non-invasive remedial guidance — fully integrated with the architecture stage.',
                'process_steps' => [
                    ['title' => 'Plot Analysis', 'description' => 'Direction, slope, and surrounding-element evaluation.'],
                    ['title' => 'Room Placement', 'description' => 'Recommendations for entrance, kitchen, bedrooms, and pooja room.'],
                    ['title' => 'Remedial Guidance', 'description' => 'Non-invasive remedies — colours, mirrors, and energy correctors.'],
                ],
                'faqs' => [
                    ['q' => 'Will I have to demolish anything?', 'a' => 'Almost never — we focus on non-invasive remedies first.'],
                    ['q' => 'Is Vastu mandatory?', 'a' => 'No, it’s optional. Many of our clients prefer it for peace of mind.'],
                    ['q' => 'Are your Vastu experts certified?', 'a' => 'Yes, certified by the Council of Vastu Sciences with 15+ years of experience.'],
                ],
                'display_order' => 12,
            ],
        ];

        foreach ($services as $data) {
            Service::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, [
                    'is_active' => true,
                    'meta_title' => "{$data['name']} — GrihNirmaan",
                    'meta_description' => $data['short_description'],
                ]),
            );
        }
    }
}
