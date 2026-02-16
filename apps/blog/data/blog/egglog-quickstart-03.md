---
title: "Egglog 快速入门（三）：复数定义与内置类型"
author: "六个骨头"
description: "承接第二篇的实数定义，先纯构造定义复数，再介绍 egglog 内置的 i64、Rational、f64 等类型，并展示如何用它们实现高效复数运算。"
pubDatetime: 2026-02-17
modDatetime: 2026-02-17
tags: ["编译/IR", "E-graph", "egg", "egglog", "等价饱和", "Term Rewriting"]
---

[第二篇](egglog-quickstart-02) 用纯构造从自然数扩展到整数、有理数与实数。本文**承接第二篇**：先用已有类型定义复数及其运算，再介绍 egglog 的**内置类型**，并展示如何用它们实现高效运算。

## 复数的纯构造定义

复数 $a + bi$ 可表示为实部、虚部的有序对 $(a, b)$，其中 $a, b \in \mathbb{R}$。第二篇已定义实数 `R`（含 `FromRat`、`Sqrt` 等），可直接用 `Rect(R, R)` 表示：

```racket
; 复数：Rect(re, im) 表示 re + im·i
(sort C)
(constructor Rect (R R) C)

; 加法：(a+bi) + (c+di) = (a+c) + (b+d)i
(constructor CAdd (C C) C)
(rewrite (CAdd (Rect re1 im1) (Rect re2 im2))
  (Rect (RAdd re1 re2) (RAdd im1 im2)))

; 乘法：(a+bi)(c+di) = (ac-bd) + (ad+bc)i
(constructor CMul (C C) C)
(rewrite (CMul (Rect a b) (Rect c d))
  (Rect (RSub (RMul a c) (RMul b d))
        (RAdd (RMul a d) (RMul b c))))
```

其中 `RAdd`、`RSub`、`RMul` 为第二篇定义的实数运算。这样复数的加法和乘法完全由重写规则给出，不依赖内置类型。

## egglog 内置类型概览

egglog 提供若干 primitive 类型，可直接用于构造器参数和 rewrite 规则，无需逐层构造：

| 类型       | 说明                    | 典型运算                      |
| ---------- | ----------------------- | ----------------------------- |
| `i64`      | 64 位有符号整数，含负数 | `+` `-` `*` `/` `%` `<<` `>>` |
| `Rational` | 有理数（分数）          | `+` `-` `*` `/`               |
| `f64`      | 64 位浮点数             | `+` `-` `*` `/` `min` `max`   |
| `String`   | 字符串                  | 拼接、比较                    |
| `Unit`     | 单值类型                | -                             |
| `Map[K,V]` | 键值映射                | `get` `set`                   |

在 `rewrite` 中可直接用 `(+ a b)`、`(* a b)` 等对 primitive 做运算，例如 `(rewrite (Add (Num a) (Num b)) (Num (+ a b)))` 表示 constant folding。

## 用内置类型实现复数

实际计算中，用 `f64` 包装实部、虚部更高效。定义 `F64Rect` 并做 constant folding：

```racket
(datatype Complex
  (F64Rect f64 f64)
  (Var String)
  (CAdd Complex Complex)
  (CMul Complex Complex))

; constant folding：加法
(rewrite (CAdd (F64Rect a b) (F64Rect c d))
  (F64Rect (+ a c) (+ b d)))

; 乘法：(a+bi)(c+di) = (ac-bd) + (ad+bc)i
(rewrite (CMul (F64Rect a b) (F64Rect c d))
  (F64Rect (- (* a c) (* b d))
           (+ (* a d) (* b c))))
```

验证 $(1+2i) + (3+4i) = 4+6i$：

```racket
(let c1 (F64Rect 1.0 2.0))
(let c2 (F64Rect 3.0 4.0))
(let sum (CAdd c1 c2))
(let four-six (F64Rect 4.0 6.0))
(run 5)
(check (= sum four-six))
```

若用 `Rational` 替代 `f64`，可得精确有理复数；用 `i64` 则只能表示高斯整数（实部、虚部均为整数）。

## 小结

承接第二篇的实数定义，复数可用 `Rect(R,R)` 纯构造；egglog 内置 `i64`、`Rational`、`f64`、`String` 等类型，可用 `F64Rect(f64,f64)` 配合 constant folding 实现高效复数运算。内置类型适合优化与数值计算，纯构造适合形式化与等价性证明。

## 参考文献

- [egglog tutorial: Equality Saturation](https://egraphs-good.github.io/egglog-tutorial/01-basics.html)
- [egglog 文档](https://egraphs-good.github.io/egglog/docs/egglog/)
- [egglog integer_math.egg](https://github.com/egraphs-good/egglog/blob/main/tests/integer_math.egg)
