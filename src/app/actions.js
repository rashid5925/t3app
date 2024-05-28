"use server";

export const getCardData = async (arrow, page) => {
  const url = `https://meta.discourse.org/c/documentation/devs/56/l/c/documentation/devs/56/l/${arrow}.json?ascending=false&page=${page}&per_page=8`;
  const response = await fetch(url);
  let data = await response.json();
  const offset = data["topic_list"]["more_topics_url"]
    ? parseInt(data["topic_list"]["more_topics_url"].split("=")[2])
    : 1;
  data = data["topic_list"]["topics"];
  return { data, offset };
};
