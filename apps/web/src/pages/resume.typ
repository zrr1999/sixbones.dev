#import "@preview/bone-resume:0.3.0": resume-init, resume-section, primary-achievement, achievement, github, github
#show: resume-init.with(author: "詹荣瑞", show-common: true)
#let Paddle = github("PaddlePaddle/Paddle", body: "Paddle")
#let CINN = github("PaddlePaddle/CINN", body: "CINN")


= 教育背景
_西安电子科技大学 #h(2cm) 智能科学与技术专业（学士） #h(1fr) 2018.09-2022.07_\
_西安电子科技大学 #h(2cm) 计算机科学与技术专业（硕士） #h(1fr) 2022.09-2025.07_

= 开源贡献
#resume-section(
  github("PaddlePaddle/Paddle"),
  "高性能单机、分布式训练和跨平台部署框架",
)[
  为 #Paddle 添加了 `remainder_, sparse_transpose, sparse_sum` 等算子， 实现了 `onehot` 算子转换到
  `TensorRT` 的功能，具体内容见#link(
  "https://github.com/PaddlePaddle/Paddle/pulls?q=is%3Apr+author%3Azrr1999+is%3Aclosed",
)[相关 PR]。
]
#resume-section(
  github("PaddlePaddle/CINN"),
  [神经网络编译器基础设施],
)[
  为 #Paddle 子项目 #CINN 添加了 `argmax, sort, gather, gather_nd, scatter_nd` 等算子，
  实现了`CSE Pass` 和 `ReverseComputeInline` 原语，具体内容见#link(
  "https://github.com/PaddlePaddle/CINN/pulls?q=is%3Apr+author%3Azrr1999+is%3Aclosed",
)[相关 PR]。
]
#resume-section(
  github("pytorch/pytorch"),
  "一个用于张量计算和动态神经网络的框架，具有强大的 GPU 加速功能",
)[
  完善 PyTorch Dynamo 的入口函数 `compile` 的类型注解信息，使得在复杂情况下可以正确推导类型，具体内容见#link("https://github.com/pytorch/pytorch/pull/129136")[相关 PR]。
]
#resume-section(
  github("huggingface/transformers"),
  "为 Jax、PyTorch 和 TensorFlow 打造的先进的自然语言处理函数库",
)[
    优化了在处理输入图片序列时的不合理处理，提升了相关模型的训练和推理速度，具体内容见#link("https://github.com/huggingface/transformers/pull/32596")[相关 PR]。
]
#achievement(
  github("flet-dev/flet", body: "flet-dev/flet"),
  [一个使开发人员能够使用 Python 构建跨平台应用程序的开发框架。],
)[
  优化 `run_task` 和 `run_thread` 方法的类型注解信息，使得在复杂情况下可以正确推导类型，
  修复某些情况下退出信号无法正确捕获到的问题，具体内容见#link(
  "https://github.com/flet-dev/flet/pulls?q=is%3Apr+author%3Azrr1999",
)[相关 PR]。
]

#achievement(
  github("astral-sh/uv", body: "astral-sh/uv"),
  [一个用 `Rust` 编写的极速 Python 包安装器和依赖关系解析器],
)[
  重构 `pip_list` 函数以移除连接元素的末尾，即消除命令行输出中每行末尾的空格符，具体内容见#link("https://github.com/astral-sh/uv/pull/2298")[相关 PR]。
]

#achievement(
  github("PFCCLab/paddlefx"),
  "用于构建 PaddlePaddle Python IR 的实验项目",
)[
  实现了若干字节码解释函数，设计并实现了变量追踪机制，缓存机制等，具体内容见#link(
    "https://github.com/PFCCLab/paddlefx/pulls?q=is%3Apr+author%3Azrr1999+is%3Aclosed",
  )[相关 PR]。
]
