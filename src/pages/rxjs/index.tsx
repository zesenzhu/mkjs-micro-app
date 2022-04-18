import React, { useState, useEffect, useMemo } from "react";
import { Observable, Subject, fromEvent } from "rxjs";
import { Timeline } from "antd";
import { map } from "rxjs/operators";
export default function App() {
  const data = useMemo(() => {
    return [
      { time: 500, next: [1, 2, 3] },
      { time: 1000, next: { a: 1000 } },
      { time: 1500, next: "end" },
      { time: 4000, complete: true },
    ];
  }, []);
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    // stream$尾部的$是表示当前这个变量是个ovservable
    const stream$ = new Observable((subscriber) => {
      data.forEach((c) => {
        setTimeout(() => {
          c.next ? subscriber.next(c.next) : subscriber.complete();
        }, c.time);
      });
    });

    // 启动流
    const subscription = stream$.subscribe({
      complete: () => {
        setList((pre: any) => [...pre, "complete:done"]);
        console.log("complete", "done");
      },
      next: (v) => {
        setList((pre: any) => [...pre, "next:" + JSON.stringify(v)]);
        console.log("next", v);
      },
      error: () => console.log("error"),
    });
    console.log(Observable.prototype, Observable);
    // output
    // [1,2,3]  // 500ms时
    // {a:1000} // 1000ms时
    // end // 3000ms时
    // done // 4000ms时
    return () => {
      subscription.unsubscribe();
    };
  }, [data]);
  useEffect(() => {
    // 创建subject
    const subject = new Subject();

    // 订阅一个observer
    subject.subscribe((v) => console.log("stream 1", v));
    // 再订阅一个observer
    subject.subscribe((v) => console.log("stream 2", v));
    // 延时1s再订阅一个observer
    setTimeout(() => {
      subject.subscribe((v) => console.log("stream 3", v));
    }, 1000);
    // 产生数据1
    subject.next(1);
    // 产生数据2
    subject.next(2);
    // 延时3s产生数据3
    setTimeout(() => {
      subject.next(3);
    }, 3000);
  }, []);
  useEffect(() => {
    // 创建发出点击事件的 observable
    const source = fromEvent(document, "click");
    // 映射成给定的事件时间戳
    const example = source.pipe(
      map((event) => `Event time: ${event.timeStamp}`)
    );
    // 输出 (示例中的数字以运行时为准): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe((val) => console.log(val));
    return () => {
      subscribe.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Timeline>
        {list.map((c: string, index: number) => {
          return (
            <Timeline.Item key={c + index}>{index + 1 + ":" + c}</Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
}
