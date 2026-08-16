import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    name: "The Milano Oxford",
    category: "Full-Grain Calfskin",
    price: "$1,250",
    description: "Hand-welted wholecut oxford featuring an exquisite oak-bark tanned sole and mirror wax finish.",
    image: "https://images.openai.com/static-rsc-4/H6K9pPKPmVjypActM4JXGPZEygS85lfFK8eAq38H7Uc8uaLJNBBS55dFGIflnpPrPPktulpqbBiKQTvNdQD0hTm8SnXYpdcCl5rwHSzq0HYXiUP2Tu58r9CFvh-zKZCSiTatyRYuD97ScyEHkFrD8VMQv-b6gWhfsxAcGHaZZ3AvUkWyOriCTuj5AeMP4K3_?purpose=fullsize",
  },
  {
    id: 2,
    name: "The Firenze Derby",
    category: "Tuscan Suede",
    price: "$1,100",
    description: "Supple split-toe derby crafted with hand-stitched aprons and a robust storm welt for timeless elegance.",
    image: "https://images.openai.com/static-rsc-4/VzsLgWV31emSLI2gX3ot_eMEyf6zmywBjancGlHYsYK36MoP3SSfBzqo4OiAtgtwq7cuSCx5ppbUJo-yAERUVs8JBLmrzXU7yiEyyGPMFYcOaZ_AHGEpzFt6mX5-id5iv-HZTG3BqtTPsF1owEjoYjUlx38FaI41YSk_dvkntRHOi9ZjN10VJhJpxKPvtDiY?purpose=fullsize",
  },
  {
    id: 3,
    name: "The Venezia Monk",
    category: "Museum Calf",
    price: "$1,350",
    description: "Double monk strap detailed with custom brass hardware and hand-applied marbled patina dyes.",
    image: "https://images.openai.com/static-rsc-4/Vyiz5CnuqcXNpwD4mmufNzjE0u9tQ_MErIQCT_Hckwleznsg403YQZZa8N8zaVjXRorKJdch81tfL8gd9eu8njNggU4aQlkqRrftVTL9Suy3IvD-GZntqzr56_R6zvkixFjkS8v3zn0ogte-L4PPwQBzE2fi3GoVSsLh_xyz4CMXdO_zBEjP9ahQBom68SFo?purpose=fullsize",
  },
  {
  id: 4,
  name: "The Roma Loafer",
  category: "Shell Cordovan",
  price: "$1,450",
  description:
    "A classic penny loafer constructed from genuine Horween shell cordovan for an unmatched, enduring luster.",
  image:
    "https://images.openai.com/static-rsc-4/bYTgu0Lb0E62-MfnBhqu7w2-MDIgXOUYsriXrCE1Oe55c0Bq03MqF49g0HyITfWOxaqyGe9jsjlCZ4Knkfa9_yshYHDYWw5uIpJ4DnabEoJRHMAK7DnEjIWHphj-V46NzZFFC9L2MlSvkz3MVmSnnb7UBOcP_0N8PSL9AKbXlQdCOg99891MVSajeL1XTjA-?purpose=fullsize",
},

{
  id: 5,
  name: "The Napoli Chelsea",
  category: "Box Calf",
  price: "$1,600",
  description:
    "Seamless one-piece upper Chelsea boot with hand-crimped insteps and deep elastic side gussets.",
  image:
    "https://images.openai.com/static-rsc-4/LfPxA22IgXGdaCgar6I1a34_DmVp58VhYVhVxmE5ziicLTeGLF3ugo0x8LFFL9AA_0s7y_lN5Ou5sAHswXFx0jIqcUSQaV70nPgK5d_fJzuQfKKj1lKZ4sJH9sztwRHDumQU54XZdH9aZ1o0Cal07Tf9XlTksckOKIXdn-j32krgb2l4viS6wDEtxq9ENstE?purpose=fullsize",
},

{
  id: 6,
  name: "The Verona Brogue",
  category: "Pebble Grain",
  price: "$1,150",
  description:
    "A robust full-wingtip brogue offering supreme weather resistance and traditional countryside elegance.",
  image:
    "https://images.openai.com/static-rsc-4/h9WSDgtRX40n3OGHh6aygfOtjLe0Gr1MPeRkQ7Exz31s7bvS0AVMxOFJOAgTSk4_6GqeEUqp8vE7MZs2cO8so2kGi-SEAhkY7iA_g44vqXG4JwahuayHRcHMtfbKlKFZmG61AjfcknsJ6JWyy4FHllk_wnGXq_2zT2QKcbEl_NkZMCYpcZp9ZTiZ-TyeTSVf?purpose=fullsize",
},

{
  id: 7,
  name: "The Torino Chukka",
  category: "Repello Suede",
  price: "$1,050",
  description:
    "A relaxed unlined chukka boot resting on a hand-cut crepe sole, perfect for elegant casual wear.",
  image:
    "https://images.openai.com/static-rsc-4/VFYRnFr6rTSMgXPfKbKlR8x17JebAqeiOcReA4Q2q1ny2scYfjCVrHARn7Gc2MCzq9nk02njc8ATVl5rUdAqYzX5psZMLXxOLg4HG6T7RCW70RSsI2TNqF06UgELIdsrChMKflFQeY8i6BKAbKFbAFtzACjZV4d-6l9tS3xQ8KKxH1lfUiBJWRBx6P2zb00b?purpose=fullsize",
},

{
  id: 8,
  name: "The Genoa Tassel",
  category: "Woven Calfskin",
  price: "$1,300",
  description:
    "Intricately hand-braided leather defines this summer tassel loafer, offering exceptional breathability.",
  image:
    "https://images.openai.com/static-rsc-4/1gwX5w0BTHnlhVMwI7z6ODSBVEpaHKOVwmim07ftJ72lP6Vg_u3VkQXgJtghqr41QiS_Nc5bJ-1KL8AEDzKhK0SIrfo7FFoQ93y9ZyELesXpt_JV-myils1JJgwfR2lcdIz2eFsKhJghV5qFnMOCABGAfHgxfzdJNyIM0zGRS0n9wol1zs8l-HZQMIq0ONDU?purpose=fullsize",
},

{
  id: 9,
  name: "The Siena Balmoral",
  category: "Calf & Suede",
  price: "$1,550",
  description:
    "A striking two-tone Balmoral boot merging smooth museum calf with a supple suede shaft.",
  image:
    "https://images.openai.com/static-rsc-4/XYgqwvxDG-tKOr3zi7Nwo-YLsRqyR511v4QNzj2Li2KxbUQCDboBLHeC0jor6RHwl9I3HrBrjAs1UiiSXub9eESwVfV86XF4Hdm6sU7x0cQB7ZqEAgvLldWrCmt4smbMU3ZQrH1wKFCVFC5Cl_Me_0CK6FOopGdYVYlcw386lBO6YDGUNWZMaE3b2g7S4cl-?purpose=fullsize",
},

{
  id: 10,
  name: "The Palermo Spectator",
  category: "Contrasting Calf",
  price: "$1,250",
  description:
    "A bold homage to the roaring twenties, featuring meticulous two-tone paneling and blind eyelets.",
  image:
    "https://images.openai.com/static-rsc-4/WubEn93z6jbAtr2GieuSufwvHzMkjO0RafpsGub7WYWfe-6BUiAdHko4MS3hsxIrePubqz3fwu5unfDI5Wi_WtYz_nSZBglunJOZ_nFi_ZUdjDhKocmngnORrSOE-I2oqF0oj8lNHLp2h6cmK1PJZoSkC5ju8uESf3m9QwhaPwo86HFBQEax_qtAf6viElX6?purpose=fullsize",
},

{
  id: 11,
  name: "The Amalfi Moccasin",
  category: "Italian Deerskin",
  price: "$850",
  description:
    "An unconstructed driving shoe engineered for ultimate flexibility and immediate barefoot comfort.",
  image:
    "https://images.openai.com/static-rsc-4/e_MpuGm9hC3paw3etetaWaYwLlWu20B_Y9OaReBABrjBH1k9yxP1aYqp3izuAzP3D1wvr81WCVutrTzRUEOB2tp4YCjWlCDhLI1AyT9L2VrVh985oXpzeimELHKRJn4QnZMSI4x8vgx97iiKw_DytqFd1YJPy4fZrUvb3q49ireqan2NiDzLfekUOLNQYviX?purpose=fullsize",
},

{
  id: 12,
  name: "The Como Wholecut",
  category: "Patina Calf",
  price: "$1,650",
  description:
    "Crafted from a single flawless hide, hand-painted by master colorists for a stunning gradient effect.",
  image:
    "https://images.openai.com/static-rsc-4/hm__vqQzT3AxLQjP1rkB8_btt7AJyQ36HHmBxhU_Qn-v3AQFWojVyNOlsTA3AHWKrii8etCT2_pnot-cWjp1f9HWmo2jH7XKlob8g3E6Gv_6J4APAIzvlvNMXhLwC3zsTqzTnBqj84Zc2qCD6BiY0r2y4B6XHB3KUGcjPFnZRuwLdcmlwPi5rJHe5Li5jvOK?purpose=fullsize",
},

{
  id: 13,
  name: "The Bologna Split-Toe",
  category: "Hatch Grain",
  price: "$1,400",
  description:
    "Norwegian split-toe derby featuring a heavy double leather sole and immaculate boar-bristle stitching.",
  image:
    "https://images.openai.com/static-rsc-4/0R3xjVNrm7wZSA0lmOargKkBIXrkksvEXGtRzS3yUaxuxiyJJnlMeE6pVZ1cmbR5Lw6X1oqX3B8twMIF9R_dAcLjHCeVz5gHNNjhWYAemfbhsPr2icAdw2WiU3Aably7KIdMpSAbCTrnUES8doy7hwMxDCNXsXvXutOSZX7YAVnge9RVUO01cVgqp_kz0ydG?purpose=fullsize",
},

{
  id: 14,
  name: "The Capri Slipper",
  category: "Silk Velvet",
  price: "$950",
  description:
    "A decadent evening slipper trimmed with grosgrain silk, designed specifically for black-tie affairs.",
  image:
    "https://images.openai.com/static-rsc-4/LtRoOjo9raGGGJz2mQpupsdyRtXCuu9Wh-exx1ZEOcfjO7XyCV0Ge7-MQg0nMBTpdGDzV4eJzBPGTEbEuHrUjXsLS4Ty706-Ev-LojuqLluj9Y64zDs9Q0YlSBFF3NgKsvTZCQb1rM3Qo2Il2onDznoe44t42nTM5EIrr34usHz9OqUE8tbO8ZO59Vu9Pm2g?purpose=fullsize",
},

{
  id: 15,
  name: "The Lucca Jodhpur",
  category: "Crust Leather",
  price: "$1,700",
  description:
    "Equestrian-inspired ankle boot with an elegant wrap-around strap and a polished solid brass buckle.",
  image:
    "https://images.openai.com/static-rsc-4/BD6Gs0s0FuRStoZW-8u6ZKlub4XeU7CW_RrW7OWx2VtSzpYaHvl0G4oFw9AnlG765bhOln_9UR5rqGx-RTm23WdIDwBhGPdwWIw98pgvss3qDACqhjTFLVaJXR9Un0kP9xqmQfDoKQwwqrUfgNvZ-V5Vm3dS4yEjI6r7FtQxPP05RdVIfIa6OXrzwcYCp-qw?purpose=fullsize",
},

{
  id: 16,
  name: "The Bari Saddle",
  category: "Oiled Calf",
  price: "$1,150",
  description:
    "A versatile Ivy-league staple reinvented with an Italian chisel toe and a lightweight Vibram sole.",
  image:
    "https://images.openai.com/static-rsc-4/JX1V8c7xAraHdruz5-XTWknn_xKAE21lOWIaEkkfcuGgLX5_HVzkgAicqL4Bckom8ntIST_fXNLmqqejjh5Bo2owAb1kz-haABBOS4Nv_TY5wWa9lPMS47zb13XeA5mJFWH3yIWTbd8M9T-0grdlx9IKLELPVwZweWXVCemS5W0Kb0PN8JcsOLYPpP5e4sSz?purpose=fullsize",
},

{
  id: 17,
  name: "The Parma Boot",
  category: "Repello Suede",
  price: "$1,450",
  description:
    "An elongated double-monk strap transformed into a sophisticated mid-calf boot for autumn wear.",
  image:
    "https://images.openai.com/static-rsc-4/DO4q4e-_fVWT5wyOQzFazuEvt6bb1LumHznnYflWa157rkjdN6VnalouRTGDVfuVtA14HzEnlXX7VJNFJ05tQ1jtUcrXyHlHZojYFVd7YHEgy2gDC26v61YAmCLldAmVRqwdNqlg96tvcVdonoHb-VVpE0B9WuWgk4L2t71dHOr6ME0jKR_U-ff30p9JAB-J?purpose=fullsize",
},

{
  id: 18,
  name: "The Modena Kiltie",
  category: "Polished Calf",
  price: "$1,200",
  description:
    "A bold slip-on adorned with a fringed kiltie and interlaced leather strap for dramatic flair.",
  image:
    "https://images.openai.com/static-rsc-4/BleOU9cESmWB0WIg1npiFJbpu3E02ELOxAzdy0k4TL1iQKzBWqQGb3bmCEkw5PnSlbzV9RivPx890sOW36xaBEDEJE3kenJZ4_4Jc0pBOFkR5AT2Ryv9mR8iUv6wrZQVtF20FRAh5JyeyKD0_qKjMUY5s1VHUYq6bwY2qOVKg6YiKfpeZrTcsnDWw2a0zSCO?purpose=fullsize",
},
];

export async function GET() {
  return NextResponse.json(products);
}