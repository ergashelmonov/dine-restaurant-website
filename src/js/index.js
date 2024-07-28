let tabs = document.querySelectorAll(".tab");
let slaydImg = document.querySelector(".slayd-img");
let infoSlayd = document.querySelector(".info-slayd");
let sliderBack = document.querySelector(".slider-left");
let sliderNext = document.querySelector(".slider-right");
let slide = document.querySelector(".slide");
let d = document.querySelector(".day");
let h = document.querySelector(".hour");
let m = document.querySelector(".minute");
let s = document.querySelector(".second");

let count = 0;

let infoSlayData = [
  {
    imgUrl: "../src/images/image/slide-img_1.jpg",
    title: "Seared Salmon Fillet",
    text: `Our locally sourced salmon served with a refreshing buckwheat
                  summer salad.`,
  },
  {
    imgUrl: "../src/images/image/slide-img_2.jpg",
    title: "Rosemary Filet Mignon",
    text: `Our prime beef served to your taste with a delicious choice of seasonal sides.`,
  },
  {
    imgUrl: "../src/images/image/slide-img_3.jpg",
    title: "Summer Fruit Chocolate Mousse",
    text: `Creamy mousse combined with summer fruits and dark chocolate shavings.`,
  },
];

function innerSlide(id) {
  slide.innerHTML = `
  <img src="${infoSlayData[id].imgUrl}" alt="photo" />
  <div>
    <h4>${infoSlayData[id].title}</h4>
    <p>${infoSlayData[id].text}</p>
  </div>
`;
}

sliderNext.addEventListener("click", () => {
  if (count != infoSlayData.length - 1) {
    count++;
  } else {
    count = 0;
  }
  innerSlide(count);
});

sliderBack.addEventListener("click", () => {
  if (count != 0) {
    count--;
  } else {
    count = infoSlayData.length - 1;
  }
  innerSlide(count);
});

function tab(element) {
  tabs.forEach((item) => {
    item.classList.remove("active");
  });
  element.classList.add("active");
}

let Slayd = [
  {
    title: "Family Gathering",
    dicription: `We love catering for entire families. So please bring everyone
               along for a special meal with your loved ones. We’ll provide a
               memorable experience for all.`,
    imgUrl: `../src/images/image/tabs-img.jpg`,
  },
  {
    title: "Special Events",
    dicription: `Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.`,
    imgUrl: `../src/images/image/tabs-img_2.jpg`,
  },
  {
    title: "Special Events",
    dicription: `Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.`,
    imgUrl: `../src/images/image/tabs-img_3.jpg`,
  },
];

tabs.forEach((element, i) => {
  element.addEventListener("click", () => {
    tab(element);
    slaydImg.src = Slayd[i].imgUrl;

    infoSlayd.innerHTML = `
          <div class="description">
            <h2>${Slayd[i].title}</h2>
            <p>${Slayd[i].dicription}</p> 
            </div>
            <a href="./booking.html">
              <button class="booking">BOOK A TABLE</button>
            </a>
          `;
  });
});

let val = JSON.parse(localStorage.getItem("val"));

let deadLine = `${val.year}-${val.month}-${val.day}`;

function time(dl) {
  let t = Date.parse(dl) - Date.parse(new Date());
  return {
    t,
    days: Math.floor(t / 1000 / 60 / 60 / 24),
    hours: Math.floor((t / 1000 / 60 / 60) % 24),
    minuts: Math.floor((t / 1000 / 60) % 60),
    seconds: Math.floor((t / 1000) % 60),
  };
}

function timer(dl) {
  let tim = setInterval(unixTime, 1000);

  if (time(dl).t < 0) {
    clearInterval(tim);
  }
  function unixTime() {
    d.innerText = time(dl).days <= 9 ? `0${time(dl).days}` : time(dl).days;
    h.innerText = time(dl).hours <= 9 ? `0${time(dl).hours}` : time(dl).hours;
    m.innerText =
      time(dl).minuts <= 9 ? `0${time(dl).minuts}` : time(dl).minuts;
    s.innerText =
      time(dl).seconds <= 9 ? `0${time(dl).seconds}` : time(dl).seconds;
  }
}

timer(deadLine);
