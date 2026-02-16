---
title: "SymPy 符号计算能力调研"
description: "全面梳理 SymPy 的运算结构、求导与积分规则、化简机制及积分变换，为符号计算与 CAS 选型提供参考"
pubDatetime: 2026-02-16
modDatetime: 2026-02-16
tags: ["Python", "SymPy", "符号计算", "CAS", "科学计算"]
---

SymPy 是 Python 生态中最知名的开源符号计算库，广泛应用于物理模拟、工程计算和数学推导。本文将围绕其核心能力做详细调研，涵盖运算结构、求导、积分、化简及积分变换等内容。

## 运算与核心结构

### 基本运算

SymPy 将表达式抽象为统一的 `Basic` 对象，核心运算对应以下内部结构：

| 结构   | 对应运算 | 示例 |
|--------|----------|------|
| `Add`  | 加法     | `a + b` |
| `Mul`  | 乘法     | `a * b` |
| `Pow`  | 幂       | `a ** b` |
| `Sub`  | 减法     | `a - b`（内部为 `a + (-1)*b`）|
| `Div`  | 除法     | `a / b`（内部为 `a * b**(-1)`）|
| `Mod`  | 取模     | `a % b` |

所有符号对象通过 `sympify()` 转为 SymPy 可用的类型；支持 `evaluate=False` 延迟求值，便于保留表达式原始结构。

### 关系与逻辑

比较运算包括 `Eq`、`Ne`、`Lt`、`Le`、`Gt`、`Ge`；逻辑运算有 `Or`、`And`、`Not`。符号对象可通过 `.is_*` 属性查询假设（如 `is_real`、`is_positive`），用于基于假设的化简。

### 初等函数

**三角函数**：`sin`、`cos`、`tan`、`cot`、`sec`、`csc`、`sinc`。当自变量为 π 的有理倍数时（如 π/2、π/6）会自动求值。

**反三角函数**：`asin`、`acos`、`atan`、`acot`、`asec`、`acsc`、`atan2`。`atan2(y, x)` 按象限正确确定角度范围 \((-\pi, \pi]\)。

**双曲函数**：`sinh`、`cosh`、`tanh`、`coth`、`sech`、`csch` 及对应反函数 `asinh`、`acosh`、`atanh` 等。

**指数与对数**：`exp`、`log`（自然对数）、`ln`。`sqrt(x)` 等价于 `x**0.5`。

**复数与其它**：`re`、`im`、`conjugate`、`Abs`、`sign`、`arg`；`Min`、`Max` 用于多变量极值。

### 特殊函数

支持 `gamma`、`factorial`、`binomial`、`hyper`、`meijerg`、`besselj`、`besseli`、`erf` 等。部分积分会返回含这些函数的非初等表达式。

## 求导规则

### API 与用法

- `diff(expr, x)` 或 `expr.diff(x)`：对 `expr` 关于 `x` 求导
- 高阶导数：`diff(expr, x, 3)` 或 `diff(expr, x, x, x)`
- 混合偏导：`diff(expr, x, y, y, z, 4)` 表示 ∂⁷/(∂x ∂y² ∂z⁴)
- 未求值形式：`Derivative(expr, x).doit()` 可延迟计算

### 自定义求导

- `_eval_derivative(self, x)`：在自定义子类中实现，可调用链式法则
- `fdiff(argindex=1)`：在 `Function` 子类中实现，返回函数本身导数（不含链式法则）

### 常用导数规则

| 表达式     | 导数 |
|------------|------|
| `x` 对 `x` | `1` |
| 常数       | `0` |
| `a + b`    | `a' + b'` |
| `a * b`    | `a'*b + a*b'` |
| `a / b`    | `(a'*b - a*b')/b²` |
| `a**b`     | `b*a**(b-1)*a' + a**b*ln(a)*b'` |
| `sin(x)`   | `cos(x)` |
| `cos(x)`   | `-sin(x)` |
| `tan(x)`   | `sec²(x)` 或 `1 + tan²(x)` |
| `exp(x)`   | `exp(x)` |
| `log(x)`   | `1/x` |
| `asin(x)`  | `1/sqrt(1-x²)` |
| `Abs(x)`   | `sign(x)` |

### 隐式求导与有限差分

- `sympy.geometry.util.idiff(eq, y, x)`：隐式微分
- `differentiate_finite()`、`as_finite_difference()`：在无解析导数时用有限差分近似

## 积分规则

### 主 API

- 不定积分：`integrate(f, x)` → ∫f dx
- 定积分：`integrate(f, (x, a, b))` → ∫ₐᵇ f dx
- 多重积分：传入多个 `(变量, 下界, 上界)` 元组

### 积分策略

SymPy 使用多种策略组合：

- **heurisch**：基于 Risch-Norman 启发式，通用性强
- **manualintegrate**：规则驱动的分步积分，便于教学或逐步推导
- **meijerg**：利用 Meijer G 函数处理特殊函数积分
- **Risch**：形式化 Risch 算法（部分实现），用于初等函数积分

通过 `sympy_rubi` 扩展还可使用 Rubi 规则式积分，可提供更细粒度的分步结果。

无法得到闭式解时，会返回未求值的 `Integral` 对象，可配合 `evalf()` 做数值积分。

### 常用积分示例

| 被积函数     | 积分 |
|--------------|------|
| `1`          | `x + C` |
| `xⁿ` (n≠-1)  | `x^(n+1)/(n+1) + C` |
| `1/x`        | `log(x) + C` |
| `exp(x)`     | `exp(x) + C` |
| `sin(x)`     | `-cos(x) + C` |
| `cos(x)`     | `sin(x) + C` |
| `1/(1+x²)`   | `atan(x) + C` |

多项式与 `exp`、`sin`、`cos` 的乘积也可积分；部分积分会得到含 `erf`、Fresnel 函数等非初等结果。

### 积分变换

| 变换         | 函数 |
|--------------|------|
| Mellin       | `mellin_transform` / `inverse_mellin_transform` |
| Laplace      | `laplace_transform` / `inverse_laplace_transform` |
| Fourier      | `fourier_transform` / `inverse_fourier_transform` |
| 正弦 / 余弦  | `sine_transform` / `cosine_transform` 及逆变换 |
| Hankel       | `hankel_transform` / `inverse_hankel_transform` |

Laplace 变换还提供 `laplace_correspondence`、`laplace_initial_conds` 等辅助函数，便于求解微分方程。

## 化简规则

### 通用化简

`simplify(expr)` 综合多种策略，无保证输出形式。参数包括：

- `ratio`：默认 1.7，若 `(结果长度)/(输入长度) > ratio` 则返回原式
- `measure`：自定义复杂度函数，默认 `count_ops`
- `rational`、`inverse`：控制有理数转换与逆函数化简

建议在明确需求时优先使用专项化简函数，以获得可预期的结果。

### 多项式与有理式

| 函数               | 作用 |
|--------------------|------|
| `expand()`         | 展开多项式与乘积 |
| `factor()`         | 有理系数因式分解 |
| `collect(expr, x)` | 按 `x` 合并同类项 |
| `cancel()`         | 化为 p/q 并约分 |
| `apart()`          | 部分分式分解 |
| `together()`       | 合并为单分式 |

### 三角函数与幂

| 函数                  | 作用 |
|-----------------------|------|
| `trigsimp()`          | 三角恒等式化简 |
| `expand_trig()`       | 展开 `sin(x+y)`、倍角公式等 |
| `powsimp()`           | x^a·x^b → x^(a+b)，x^a·y^a → (xy)^a |
| `expand_power_exp()`  | x^(a+b) → x^a·x^b |
| `expand_power_base()` | (xy)^a → x^a·y^a |
| `powdenest()`         | (x^a)^b → x^(ab) |

### 对数与根式

| 函数           | 作用 |
|----------------|------|
| `expand_log()` | log(xy) → log(x)+log(y)，log(xⁿ) → n·log(x) |
| `logcombine()` | 逆操作：log(x)+log(y) → log(xy) |
| `radsimp()`    | 分母有理化、去根号 |
| `collect_sqrt()`| 合并含 √ 的项 |
| `collect_const()`| 合并常数系数 |
| `rcollect()`   | 递归收集和式 |

### 其它专用化简

`separatevars()`、`nsimplify()`、`combsimp()`、`gammasimp()`、`besselsimp()`、`kroneckersimp()`、`hyperexpand()`、`posify()` 等用于特定类型的化简。基于假设时可使用 `refine(expr, assumptions)` 和 `ask()`。

## 级数展开与极限

- 级数：`expr.series(x, x0, n)`，默认 `x0=0`、`n=6`，返回带 `O(x^n)` 的展开式
- 去除阶项：`.removeO()`
- 极限：`limit(f, x, x0)`，支持 `'+'`、`'-'` 单侧极限
- 未求值形式：`Limit(...).doit()`

## 数值计算

- `expr.evalf()`：符号表达式数值求值
- `integral.evalf(50)`：可指定精度
- 依赖 `mpmath` 实现高精度计算

## 参考文献

- [SymPy 核心模块](https://docs.sympy.org/latest/modules/core.html)
- [初等与特殊函数](https://docs.sympy.org/latest/modules/functions/index.html)
- [化简模块](https://docs.sympy.org/latest/modules/simplify/simplify.html)
- [积分模块](https://docs.sympy.org/latest/modules/integrals/integrals.html)
- [微积分教程](https://docs.sympy.org/latest/tutorials/intro-tutorial/calculus.html)
- [化简教程](https://docs.sympy.org/latest/tutorials/intro-tutorial/simplification.html)
