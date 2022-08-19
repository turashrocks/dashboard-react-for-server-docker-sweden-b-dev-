import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import {
  Spin,
  Space,
  Statistic,
  Card,
  Grid,
  Typography,
  Divider,
  Button,
  Timeline,
  Comment,
  List,
  Carousel
} from '@arco-design/web-react';
import {
  IconDesktop,
  IconCloud,
  IconGithub,
  IconFile,
  IconArrowRise,
  IconHeart,
  IconMessage,
  IconHeartFill,
  IconStarFill,
  IconStar
} from '@arco-design/web-react/icon';
import style from './style/index.module.less';

import { getWorkplace } from '@/api/workplace';
import useLocale from '@/utils/useLocale';

const { Row, Col } = Grid;
const TimelineItem = Timeline.Item;

export default function ListCompontent() {
  const [likes] = useState([]);
  const [stars] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [staticData, setStaticData] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useLocale();

  const quikEntranceList = [
    {
      icon: <IconDesktop />,
      title: t['workplace.quick.entrance.workplace']
    },
    {
      icon: <IconCloud />,
      title: t['workplace.quick.entrance.resource']
    },
    {
      icon: <IconFile />,
      title: t['workplace.quick.entrance.documents']
    },
    {
      icon: <IconGithub />,
      title: 'GitHub'
    }
  ];

  const onGetWorkplace = () => {
    getWorkplace().then((res) => {
      const { imageList, staticList, commentList } = res.data;
      setCommentData(commentList);
      setStaticData(staticList);
      setImgList(imageList);
      setLoading(false);
    });
  };

  useEffect(() => {
    onGetWorkplace();
  }, []);

  return (
    <>
    </>
  );
}
