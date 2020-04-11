import React from "react";
import { Container } from "@material-ui/core";
import FaqItem from "./FaqItem";
import Header from "../../components/Header/Header";

const list = [
  {
    question: "Who are you?",
    answer: "We are a group of students from Mumbai",
  },
  {
    question: "What is the purpose of this project?",
    answer: `There are many social groups and NGOs out there helping people by providing food and other necessities but there is a disconnect between the people who are helping and those who need help. This project is aimed at removing that disconnect`,
  },
  {
    question: "Is this project affiliated with the government?",
    answer: `No. But if you are someone who can help or spread the word, contact us on the Instagram page on the home screen`,
  },
  {
    question: "How can I help?",
    answer: `If you are someone who can prepare food packets and distribute them at the reported areas, register and claim an area. You can also help by reporting areas so that other people can see them`,
  },
  {
    question: "Why do I have to upload an image of the help I am providing?",
    answer: `We do not want to entertain any kind of mischief or be held responsible for it`,
  },
  {
    question: "Why do I have to provide my phone number?",
    answer: `Your phone number is required to contact you should any need arise`,
  },
  {
    question: "I am facing an issue with the app. What should I do?",
    answer: `You can contact us on the details mentioned in the footer of the home screen`,
  },
];

const Faq = () => {
  return (
    <>
      <Header title="FAQ" showBackButton={true} />
      <div
        style={{
          padding: "30px 5px",
        }}
      >
        <Container maxWidth="sm">
          {list.map(item => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Container>
      </div>
    </>
  );
};

export default Faq;
