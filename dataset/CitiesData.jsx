export const cities = [
  {
    city: "Eskisehir",
    places: [
      {
        placeImage: require("../assets/images/eskişehir/porsukCayı.jpg"),
        placeName: "Porsuk Çayı",
        placeDescription:
          "Eskişehir'in simgelerinden biri olan Porsuk Çayı, şehrin ortasından geçen ve çevresindeki keyifli yürüyüş yolları ile tanınan bir akarsudur. Gondol turları ile de turistlerin ilgisini çeker.",
        placeAdress: "Odunpazarı, Eskişehir",
        placeWeather:
          "Genelde ılıman, yaz aylarında sıcak ve güneşli, kış aylarında serin.",
        placeOpeningHours: "Her zaman erişilebilir",
        placeRatings: 4.5,
        placeMap: [
          {
            latitude: 39.776667,
            longitude: 30.521111,
          },
        ],
      },
      {
        placeImage: require("../assets/images/eskişehir/Odunpazarı.jpg"),
        placeName: "Odunpazarı",
        placeDescription:
          "Odunpazarı, Eskişehir'in tarihi merkezlerinden biridir. Geleneksel Osmanlı mimarisine sahip evleri, renkli caddeleri ve sanat galerileri ile ünlüdür. Ayrıca Eskişehir'in kültürel mirasını yansıtan birçok mekan burada bulunmaktadır.",
        placeAdress: "Şarkiye, Atatürk Blv. No: 37, 26020 Odunpazarı/Eskişehir",
        placeWeather:
          "Ilıman, yaz aylarında sıcak, kış aylarında soğuk ve kar yağışlı olabilir.",
        placeOpeningHours: "Her zaman erişilebilir",
        placeRatings: 4.6,
        placeMap: [
          {
            latitude: 39.764839,
            longitude: 30.516746,
          },
        ],
      },
      {
        placeImage: require("../assets/images/eskişehir/masalSatosu.jpg"),
        placeName: "Masal Şatosu",
        placeDescription:
          "Masal Şatosu, Eskişehir'in Sazova Parkı'nda yer alan ve masallardan ilham alınarak inşa edilen renkli ve büyüleyici bir yapıdır. Hem çocuklar hem de yetişkinler için harika bir ziyaret noktasıdır. Şatoda çeşitli masal karakterlerinin heykelleri ve interaktif alanlar bulunmaktadır.",
        placeAdress:
          "Sazova, Bilim Sanat ve Kültür Parkı, Ulusal Egemenlik Blv., 26150 Tepebaşı/Eskişehir",
        placeWeather:
          "Ilıman, yaz aylarında sıcak ve güneşli, kışın soğuk ve yağışlı olabilir.",
        placeOpeningHours: "10:00 - 17:15",
        placeRatings: 4.5,
        placeMap: [
          {
            latitude: 39.774493,
            longitude: 30.518679,
          },
        ],
      },
      {
        placeImage: require("../assets/images/eskişehir/balmumuMüzesi.jpg"),
        placeName: "Balmumu Heykeller Müzesi",
        placeDescription:
          "Balmumu Heykeller Müzesi, Eskişehir'in en ilginç müzelerinden biridir. Bu müzede ünlü kişilerin balmumu heykelleri sergilenmektedir. Ziyaretçiler, ünlü siyasetçilerden sanatçılara kadar birçok kişinin heykelini yakından görebilirler.",
        placeAdress: "Akarbaşı, Atatürk Blv. No:43, 26010 Odunpazarı/Eskişehir",
        placeWeather:
          "Ilıman, yazları sıcak, kışları ise serin ve yağışlı olabilir.",
        placeOpeningHours: "09:00 - 17:00",
        placeRatings: 4.6,
        placeMap: [
          {
            latitude: 39.774299,
            longitude: 30.522071,
          },
        ],
      },
    ],
    activities: [
      {
        activityName: "Gondol Turu",
        activityDescription:
          "Porsuk Çayı üzerinde yapılan gondol turları, şehri romantik bir atmosferde keşfetmek isteyenler için harika bir aktivitedir.",
        activityImage: require("../assets/images/eskişehir/gondolTuru.jpg"),
        activityAdress: "Porsuk Çayı, Odunpazarı, Eskişehir",
        activityOpeningHours: "10:00 - 22:00",
        activityRatings: 4.3,
        activityMap: [
          {
            latitude: 39.776667,
            longitude: 30.521111,
          },
        ],
      },
      {
        activityName: "Odunpazarı Evleri Gezisi",
        activityDescription:
          "Tarihi ve kültürel öneme sahip Odunpazarı evleri, restore edilmiş Osmanlı dönemi yapıları ile şehrin dokusunu yansıtır.",
        activityImage: require("../assets/images/eskişehir/odunpazarıGezisijpg.jpg"),
        activityAdress: "Odunpazarı Mahallesi, Eskişehir",
        activityOpeningHours: "08:00 - 20:00",
        activityMap: [
          {
            latitude: 39.764839,
            longitude: 30.516746,
          },
        ],
      },
    ],
    localFoods: [
      {
        foodName: "Çibörek",
        foodImage: require("../assets/images/eskişehir/ciborek.jpg"),
        foodDescription:
          "Eskişehir'in meşhur yemeği çibörek, ince hamurun içerisine kıymalı harç koyularak kızartılmasıyla hazırlanır. En popüler adreslerden biri olan Papağan Çibörek, lezzetiyle ünlüdür.",
        restaurantRatings: 4.3,
        restaurantOpeningHours: "08:00 - 20:00",
        restaurantAdress: "Papağan Çibörek Evi, Eskişehir",
        restaurantMap: [
          {
            latitude: 39.764234,
            longitude: 30.525642,
          },
        ],
      },
      {
        foodName: "Balaban Köfte",
        foodImage: require("../assets/images/eskişehir/balabanKofte.jpg"),
        foodDescription:
          "Izgara köftenin üzerine ekmek, yoğurt ve sos eklenerek servis edilen yöresel bir Eskişehir yemeğidir. Lezzetiyle meşhur Abacı Balaban Köfte, bu yemeğin vazgeçilmez adresidir.",
        restaurantRatings: 4.3,
        restaurantOpeningHours: "11:00 - 22:00",
        restaurantAdress: "Abacı Balaban Köfte, Eskişehir",
        restaurantMap: [
          {
            latitude: 39.765781,
            longitude: 30.529076,
          },
        ],
      },
    ],
  },
];
