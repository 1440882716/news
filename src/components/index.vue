<template>
  <div class="container">
    <Header></Header>
    <!-- 搜索条 -->
    <!-- <div class="content">
      <div class="search-box flex-r flex-b">
        <img
          class="logo-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAAAtCAYAAADPyKtvAAAAAXNSR0IArs4c6QAAFlRJREFUeAHtnAu4XdO1x+fa+5w8xCOJJPKQF9IQIajqV7S01+tK1DO9qfoQ7xaJ0opHXQf16i15tBStV8tt3SglCR9XiyjqokVJVMgLEYTQJJKcs/da9/dfa81z5lln7X3W3jvnFF/G+f57jjnmmO8xx5xz7bWPZzqTGsZ3MSvX7Gq8ujpTaKqt5u71xqz33zMzZi+oraCNuT9tI1DXqQ1asWakyeeeNF6QN9hlbZQzxiteQRkX1lbOxtyfthGo1TIq608+N8rU5fKm4FeWL03bVxnBX9OSqpRtTr58nLdAuKrKcjZmq3EEcDedSJ63k/G8qEIFVYOMhWITZc3bQK3fhHIeAi/H+B1h3FC4zyYdRbMfjaEd5V9NfWnAbKA2PQb2BKnUuZ7SD3Y2QdiOAmH1h8oc9hJ4i01d49LUXlUulAEOjKHcy/VRA32bvJNB1NsaCnKyroU/BixzZOXYoSTuGyusL6fYSWk7Us/YuK4i4YpS9XaeUZ75713xPV8woUGZ/zT54C7Ol4FZR9O6AYVZqZ65bsqtN9MfXpM1SwY9DZQll7eySsLBKH+5kgwZdLWIu2fQsyruom+0wkS4O/FTEzI3qnG4DLztCmP+AsJDU+RpohMQjnIS/gb/mhNvxXaeUeaDAfiNwaaJfuZw31PnLGzVks9XxDVqHX6fAfJ0ldKWZBgTZ5JhlfK8PUjrk0hXXks6ngyxEULtDNoNtgMngXJ0PYlpRjka+R7lMjppattuTlx2p50keURS/OnajPIHB/QwTV1u4mzX1/hBqQGzbemJ3iborTS5psWhcPLYc0xd/iDOhwHDTYPiNnqWicMgQGKPv/D5XM4UzUVm+v1zbeE1htre3PaHt6gay7TZZUzfAYusoILwIHQfzKB/ODq/SOjxzKyZ9oV7pTkWMfsRuDuNjgV3ABn4iUD7l7ytxiKNfo/wTSdBk3cs2CqWPUH4dMy/S/ilmFewC5jmxF32J7UZZaFeq+9ojIR7qzunbh0xb5ODYIl5e/P3QiM8y0ww+fzurcwhJWsrkYxTN2/PrG4lLx1RG6cCa9VpmhqH/k7CSPh7nXga+zzCH6clJGTqeRdwMhgA7EjAliRN8J+A63FLKpOg8jcto5BPSZfMpYVEpgA9hZgAZJTlSEYpuLQPEWuUs+D/K07sR6i+2C1b/bPYGr4rEH0E3q7NKI3ZITTIQsaxq9M4BPPNzJlFc8bhW5q6piGmkacv7TpZtTcmnUn94G0ewGsQs1BPlI7IoujoKM9hTjyN3QxhVqPUWfBiMCitoBIyTdTDJdKSYtfQNbEnAHnZU2LFZwkbwPlgb5BG1ki11ctgqiF34WuhWNKl5uvAem+195M48TFCewy4Cf762ozS5xFPHe1nRzXsqO1SPf0uFF4O9eoK27Cd66xh2MLDIPUjOTzyyuualphpf9DgZyEfJSzf2L7eCf9CIqMG8BzQO5a/RTgDuJOtpG8DezbSlp+VVL88q22zyh0IbH2aoEXApaVEygyMq9qK15VRXt71/MuIPwCOARuKtGjsmMorqd5SpDnQTnFarLCcUItGu53SLDXCFGyhVlhZ6Hk7Y1jyXPONX/xLu5l1bgzC54HyjqNNPRbW5H/MmfIeNaZNfs8L4q26xTiCvFbBE210Swtk1q5pa8tJ25pPRG6N5G14u/XANtOOcNYom4XtMFqtMuDDgHjbl8vhzwMiLZKvhlz0ofZqsg52ZFlZ5e0G6p0M1rht6CS1YV0jSY6dq3wJkQmxYC7hsW5iCt8P2bax3G7XSTXV12zpycT24/oe+8NPtmcb1TDP4DvoG9rP5Gh4HHbzjFFT8TkzffYJTkpHs2kD0oNKwwGJK5fxKG4NKBbXMF7RWc06AZWrOi1J3hO4bdAlJFm/1e/IULd2beEi1V9qR+hL2lApQQOioNWn+0hKCa6xq0w33iqjHaRWwkyRj1YNxCCH4OW0/jcxk8buaXK+O6hlitEiDvaMzpLBS2UUPw9JGnydKWeDEU6HdCa1tCvMPBsh1DheBeRBKyUZkrZSbYWW7KG/7W5kNaKLyHCiM4A8reghsCjk2n64RmXLd7XGE1F/1ZcrQNJIEaVT9UYZ5EbwIHxTUwzbdk34UDzzESjuj/IG5sX0pn2upPK88ir2ZprsnFZpMk1HCXfik3lKxeWBJ4G9HQVtm6eCHRxZkpX30nFhvzjhDcKTQGZjivPZYHcYQXQrcBeEjhEak1Sq3igN50ldOvx4kWh9VkqFMPPLlWb7jOnLU2jCzwBbOG0/Ev7QOL6A8DIgPTuS8+EHgUpJHnh6IpMedLd3vFI7/wm0EGQwA8DJ4HJg2wSbmWTUC4HK1e1bhmhJF0tre23KtglWuYIQo7Skaiul6IK0wuQLiyrN+hnT1+jIS9yfaPdg4tYodTu+E0wFMlzp/xFUY5TyEkuAnjf2ASLd7lWHDM09yxJtJm3ZdwEZ5M1A58oLwG+AyquUVMaVTibX1nSc0dleYyPekhZlaRdqtVLDhgYaHozi1q1kn7NhU8XwPG0L883Uh1am1tFxwrDjieI1ae6Klbdw41bd3YKsrNpQW7YlTU4vIM90HDgRyKCq2b4/IJ+2TZ1JLT0OsxN4yApSQrVB59DZ4OM4XW2UcVdDMm6X5DUtaeENAwoHA0uvi3Gt1ya0H65+sQ/PJoeHioE5HdNWpysjH29eDDufNvmVlVWZ9rGo75bIou1EZzhLQ2B+DJJt02RvKHLLlkHImA4CaovSloJtQaWkvLq5uxcdLSZdfuQI2iN3sagst53t5S2XLhvR4pcHlsHqEdlcoNu+SG3+i5jqjLLYNIyLTW9e1l3Hg+855tr73lRhn1JKDqoGQyhH2uYuLKdQQZrql6HdCIYC256R8JbkxR4E8uJKl5Hqkcv7oBrSpKsMS5a3oZV3ZriAyuSFvxVXqt1gbMwrUP8XiWkxytPDr/2u42H4pmzFduCk05Z8vo3I0Wn9FYq/MpPHNTKU0aNxaSu/HnxHFPCQnHXr32tmzPqNOevAAcavv5Z0JiquR4/UtVG15ImzxoHSNZy+/6ZZtsmU8GvK1hrlYjpD0YBmegruNWAnSO2U0XwTbApE8loaQKW5evsTHwREOhNlIZUh76Py+5fI0BO5vKRL84iU225d3Q3J23nbkGXasi6FORBo29aiE0Ty4leHHB8tRplvHInX+4+WObAqKaFsKXoU1JWfNxyAMaUoOSI9JDfFh0OJnx9jutZNiM+jLUqu2bRIWzh9Fbm+8eEKDVL5l4NbgLyHSDfTF0Ku5UO1y1CtUepsczxI0kQE+wBN3IvJxBJxDY4G/Wxgt6oSqq3ET1eobzOrbfK47vlXS15kwyhW+tPOhtrezuSGhahOkQ3Fp9X1CvJzwE3Azges+Ql4ToyoxSgNv59R/VlfrojyW+O0sfQwfDWtGBlCzhsdOshK69HQBEF45kivpKR0CSknlkyNErol0u325w6yVG6NkVAvG1XLZSC/LauVnuhub+kabaXy+l8DI5wkLYavgH6OLMnq1q5Lh7yZPJmoEfwz5Mp/aPxUtuq2pAuSPKH6vxLoPKt2jAFJ2hUB9hd9gdBilF4QKevFCr2JU4pavCQmbeeuhLJeMdO0BsEHpqnbwlDL93YJZXrG2Z6HdYtVu/zM3snNmZUv0+msRaTqaaLuAfKWlZI1jkry6cL2WCLDXsSfSsiSUXnXQ8DxToIW0lInXopV+fKCvRyFSfDWGbADh+fpCwjdxWLVVe9XwY1gRotRGjM6tGnff8n43ksYUolJCrbijaD9SPd5mWIOhaSvpPB8GHyJI8FIUywuNP3HrDDj2YO9tTuQBw8bPGMC/3XqTNRDvUFsrW5KsVik3mYXH5bx2fjQytVFpiPJHSm5gWVAns96epsub5bcFRCFJB15NBnhanAvuBLYMmBbkc7JlsT3sZE41C1bEH0RqCxrb7rAaRtXG3WW3BroXD0FrIuUpuy3Bet4ROS5vEvN9Fm/JzGdzjrkMAxtP9NUeMf0Xn2EaXjMPbu0zjNp3MzQKAuFeaahwY8vOcMxaLrqn29mzHm0dYZ/acwOmBrh8tU0KplfZ6gVFRYkY9geHBnnkzFZ44pFzYHmQJ5OpAnfG3yoSIJuJv7NWKYznxaMJZ2n7wZyNCrLlgebSj9Hqhtze6R+aLfQmMgI7wKXgNeA6AlwLjgObAbqo8H7pNsw7qdb8cItBQTdzZnjxph8yssVRX7oFfjjjJcnL6vqwx57mLPGqdK2FPisnmD38NWzwIvOk0GXbamnF5ekNSZXXBRmOv3goaZr156mSUeOmHLUYymnNlGUzytu02dl2UpszkpCDdZ8sCbO9HolmVN0NeAPAPWjEZwH5IUqJXnY7nGmtYS2fcly/oDg6ViovmicWsYwTiDQlnphHH2TUGfPV+O4jleaBGci4pT0QLuWkIVUzx3gl2BuIoPacSa4DkwEiyOjzLEi8zn+lYoWj3dbuH4CdxEhFoUiLFJvixuzI571ydSuK9UuwuhC83IoUh6tg/X8NLbnZtpiWD/erSygr1n1SE/tiMmnUrWy6E/l84dWvIFDnffGAeuJNKFpk5q1Wm19Qq30dwrIctnRESr9GNW6BcuJCpYegRkTR2rpry2vVChvmDTGpK4Wh7bvcLo1/Ls4l47QDSZzpMTtBKYkxaLo++1VlL0gkvj8HyFl8141DTMbzZTxW5i1a0eynZevM8ziaYI6krJ6iI5sQ2eXrdUvT97RVJHBR+7QM/afBGzYxkW3+KVm7bJ34oJHhw7Ivq7WtHYYHrJfm2eWbitkkAWu8UV/niveyH9+R6DOnHIIN6RgBJOu72TKU3SjjgxZ1pXUb/GdERd6xWCeuen5JvPdsb24VW9LPezsXvTg2fdGRccGHYNCSpaIkKIC/10TdF0U62wMPucjwGltGdvWoKPwWHlTbLGq9H773+PbmJM4U77ENjyRR0etjSjH4xyfC5JPmOe3NL6sMhedYerNNhhjPx7Os10E/wjLD/g3LnpeWSi+gvFNxPicw2TcgjqqaPTXmuvuTbtNpjdzo/QzPQJ1oRczz7+UqReTDtk8NCITPG2mzf5rpjxWKfC2D38o1ti0zNQ3LY3FY8Krhec9Z6bNetaqdnColTcMbAH0PG4xCG9uhJZ6wwwEOnwn06TTH+hBsdLtwtQOsgNYAd4FllTPKtB2wUUayqe6yl1W+pH+CVB7ayGd3bcE1vuoTR+AUm0jKaRhfKq/egKgHau9x0V6Pjkc6Lz6OrBjBBs+u+yTkEkuUrs+1r02G4X/8HTtTjyfRN/bi5cwfpstY7MWXy8qq/ea+Sn/A+j747sbf+2I8Dzpd9rvdI6iBeeBLzS3Knp8Mo347cBedg6H/ykYAWRkSToDwdFgJLB5esA/CqaDy4GlK2F0PtFjjzTSZP8fuCZGUkdG+z/gcXBxMrHCuBbTk0APqu3lcgH8RWAOSNJBCH4EvgysrcjI1Mcbge07bDMpz8/B1rFEfTsd2IvqIfC/jNMUaEHIGAXRlbaiKFruc+U6dWjr+Ew4mm9XRpdTb5MW7sxYZRBEjSuuVaOj8vKdYpRXU9/Z4BYwGeiRlDziOCCj3AZcAEQaoHJjo3Q7qdK3JJkdXCvrBjMRvA8utUInlL6MRHpptCfCfcAwcC34GFRLMvBB4GbwINBCOgbcDfYA1nBgzVlgKngGnAZkjPKy48HPwN7gOOB6zcHE7wAzgerQgtMCvQGoDwXwJzAWYAzh990y7gbwR6CxWFJu4El3KOfjXXKbhZ5N38jY3+Y4Ku2yGpIg92Kol+fZqJfrxs16NV85arV2JB1L4eeCCeAup6JF8M+DR4AGyiUNWjlKSy8l07bXADSBWhxJkrdIyyu974OVYCiQp9dk10KaeBnafXEh9xK+AY4A1ij3hZdByuOpfhmTpXtg7gf/DeaDS4ClvWA0y5OBtm6RxncgKCoCvR9D/Lv6gFTvn0OODxWQjYL4h2K6u+g1smoQ/nwifrRT5JKjMjx+/9G3xzvZGlGVljzQReAm4BqkW5i2tAZXAC8j0TkujZrShCVkXZDr/C3PcxXQJGelnVE8HGiStXCUV+XVSvVOAVowy0GfWCajvRC8DH4AXIMkGpKObteDc0C/UBJ9LCbYHHwjioafH/KpstIWnXWKbnvKblFOuWIxShlkELzFbfkF4mp8dpJ2EHxsuq9/PcyU49loVEL0ID17SZVqbkeGIUBGWY7sypaOPJeM+WKwBiRJg16JYWrwZ4AtwLVAHlOT2h7JCJeCO8FKMAvsD9LOf4gzk/pn6d9gZPxqn2hL8BXwI6B2lqIbSfge+CLQUUD0LLgd3AfUVoWPA/UhM1lLLZ9BPxRb+dyo6JW24Bdm+pwrymdoN1VvAo0K104QvNiudm0KWsla7e9VWEwO/R1B2sRshdyd2PaKjpafMZehqPPjdUAe6lZQioaToOOG8sg7PgFeBfK4D4A0z4O4XVqHhnaO74KuYAfwCNC5UrQp0IJ8U5EypN3tE9DX0dEWfQpQeUcCLere4GfgUmC3cNjSlM0oVz+Fa+8yPPxuPPDWmTMP5R/qp7ywUbqe1ilN+uF9MJRX2pB3+CVHW5P62R+0N9CohCSDlNHIKFaHktYflxA9rrUoc+yHaGqLuwWoDp3P0uhUhDKOs8HpQEbIuIVPDnYj1FmtGlLfFoJXgHYHOZh7gIxVtArI2IaBcjSIxE2APRdaXU2qtndB7f8WuBVoC58J2qVsRlng7R65db1c4XlXGa9wldGLElURDibPP5nk8TpGvo5//fJqVcVkz/QGqouAPIO2l1Kkc01yS9agphlltnFLr0keVkamrfwOMAkk65XxnQgeB08BO9gyTBmr8hwHqiF53dvBbSUyf4D8z+BkcD3Qwkkj9eEj8JyTmIfXmK2JZTL0X4OJ4CiwAY0y4DfedfzPv/CNn6A+Ok5qfKohL1rz4fmUf1vcK8jqvaqpTHm0/TYArdzHgAYpSd9AcAA4L5nQQXF5qOOBtsrrgAxVHsaSJrEPOBP83QrjUAN/DmgAi0A1JMMsR5eTOBfMAGqD9aKwIWnBnATOBzJiS+fC7A8OBHah1cMPAG+BTJTLpGU83iJyNDUstUBF6ecNgb/ANMzSVtHR9DsquBTcDH4NNHCjwJ7gajAHJM+Obo9JbkNp6aVkaXL1+zvgCeDOgzyoDOFhkDRIROEzPxnxaYpUQWltSRbzJAJ5QhnfM2AyGAeOBbPAr8Bt4Brg0lwiewN5xH3AwUBHg+2A8mSiugxa+sHCTqERZulOhgJDFZXldehvbpItuRjBs2AKuDtO1NJaCLTqZbi1krydynRJMtcLumm6UY8HuhjYuTgMvjeYBtJoKcJbwASgBfUhqIQKKCfbmJb/BoTzwQXgSqBtWf2QTMZ6G9DicEnGfAS4FvxvnKDxPRo8HsfdIE+kzZhlM7PwTXQOtcXECxhu8ZXyef0WJ7eQf6b/bqVZN4D+QMroCVaBt0BykvohGwr+BjSJSRqMQNvrC8DmlbcbDXTLXw4sDYHpDv5hBSlhX2QyyneA6u4BloDkpCMKSRcM9UFtT26toUKJj3rk2iGUz912S6g3i/vD9QLy7spbapGRFJL6q/GTnhZRchdCFJL6OQIsBh+BkP4fFPCjy0I/d64AAAAASUVORK5CYII="
          alt=""
        />
        <div class="flex-r search-inp">
          <input
            type="text"
            class="inp-box"
            v-model="keyWord"
            placeholder="请输入内容"
          />
          <button class="btn-search fff-font" @click="toList">搜索</button>
        </div>
      </div>
    </div> -->
    <!-- 轮播、商品模块 -->
    <div class="full-container gray-bgc ">
      <!-- 分类和广告 -->
      <div class="bannar-center-box flex-r flex-b">
        <!-- 轮播图 -->
        <div class="bannar-box">
          <!-- 轮播图 -->
          <div class="block bannar-box">
            <el-carousel trigger="click" height="1000px">
              <el-carousel-item
                class="bannar-item"
                v-for="item in bannarArr"
                :key="item"
              >
                <img
                  style="width: 100%"
                  src="../assets/img/bannar.png"
                  alt=""
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <!-- 新闻动态和通知公告 -->
        <div class="news-ad-box flex flex-e">
          <div class="news-and-ad flex-c flex-b fff-font text-left">
            <div class="news-ad-item">
              <div class="ad-news-title font24">公告</div>
              <div class="flex-r flex-b" v-for="item in noticeData">
                <div class="ellipsis-text pointer" @click="toNotice(item.id)">
                  {{ item.title }}
                </div>
                <div class="hot-text-box font12 m-r-20">热门</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in goodsData">
        <!-- 民主法制建设 -->
        <div class="home-goods-two flex-r fff-font" v-if="index == 0">
          <div class="two-goods-img">
            <img
              class="goods-img-size"
              :src="item.pics"
              alt=""
              @click="toDetail(item.id)"
            />
          </div>
          <div class="goods-des-box text-left">
            <p class="font48">{{ item.name }}</p>
            <p class="font28 m-t-40 goods-des-text">
              {{ item.description }}
            </p>

            <div class="font20 m-t-40 home-price-text">
              ￥<span class="font48">{{
                (item.price * item.totalNum).toFixed(2)
              }}</span
              >/年
            </div>
            <div
              class="buy-first-home font24 m-t-30 pointer"
              @click="toDetail(item.id)"
            >
              立即订阅
            </div>
          </div>
        </div>
        <!-- 人民权力报 -->
        <div class="home-goods-two flex-r fff-font" v-else>
          <div class="goods-des-box-second text-left">
            <p class="font48">{{ item.name }}</p>
            <p class="font28 m-t-40">{{ item.description }}</p>
            <div class="font20 m-t-40 home-price-text">
              ￥<span class="font48">{{
                (item.price * item.totalNum).toFixed(2)
              }}</span>
              /年
            </div>
            <div
              class="buy-first-home font24 m-t-30 pointer"
              @click="toDetail(item.id)"
            >
              立即订阅
            </div>
          </div>
          <div class="two-goods-img text-left">
            <img
              class="goods-img-size-second"
              :src="item.pics"
              alt=""
              @click="toDetail(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./common/header.vue";
import bannar from "./common/bannar.vue";
import Footer from "./common/footer.vue";
import { paperPage } from "@/api/goods";
import { noticeList } from "@/api/user";
export default {
  components: {
    Header,
    bannar,
    Footer
  },

  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      // goodsId: "1496359872988073985",
      bannarArr: ["../assets/img/bannar.png"],
      newsArr: [
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: true
        },
        {
          text:
            "风雨兼程半世纪，列车奔驰追梦路——莽莽全国政协召开双周协商座谈会 义务教育",
          hot: false
        }
      ],
      noticeData: [],
      newsFirst: {},
      newsSecond: {},
      goodsData: []
    };
  },
  created() {
    this.getGoods();
    this.getNotice();
  },
  mounted() {},
  methods: {
    getGoods() {
      paperPage().then(res => {
        if (res.code == 200) {
          this.goodsData = res.data.records;
          // if (res.data.records.length == 2) {
          //   this.newsFirst = res.data.records[0];
          //   this.newsSecond = res.data.records[1];
          // } else if (res.data.records.length == 1) {
          //   this.newsFirst = res.data.records[0];
          // } else {
          //   this.goodsData = res.data.records;
          // }
        }
      });
    },
    getNotice() {
      noticeList().then(res => {
        if (res.code == 200) {
          this.noticeData = res.data;
        }
      });
    },
    toNotice(id) {
      // console.log(id);
      let rotuetURl = this.$router.resolve({
        path: "/noticeDetail",
        query: { noticeId: id }
      });
      window.open(rotuetURl.href, "_blank");
    },
    toDetail(id) {
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          goodsId: id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/index.css";
</style>
