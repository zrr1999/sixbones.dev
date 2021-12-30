---
title: BoneTeX Code 介绍
---
[BoneTeX Code](https://www.wolai.com/7DqSZZT39VJu4hWBnGLTDk) 是一个高效的LaTeX文档编写工具，可以大幅度提高编写文档的效率和质量，其分为三部分，BoneTeX Core、BoneTeX Server和BoneTeX Editor。BoneTeX Core是一个自动生成大量繁琐重复的高质量LaTeX代码的Python库；BoneTeX Server是一个基于Flask的后端接口脚本，使BoneTeX Core的核心功能与本地环境无关；BoneTeX Editor是一个基于Electron的BoneTeX语言专用编辑器。

我们充分考虑了不同用户应用场景的差异，提供给用户丰富的扩展接口，使他们可以通过插件的方式扩展BoneTeX的功能，以便更适于自己的用途。

## 设计理念

### 规范性

自动生成的代码优先考虑可读性和规范性，对于不影响可读性和规范性的情况，生成的代码会尽量简短。

### 易用性

尽量减少对原生Python和LaTeX语法的改动，使得用户易学习、易迁移，更容易借助IDE程序的代码提示功能。同时，我们充分考虑了零基础用户，对Python和LaTeX语法的改动使得其提高了可读性、灵活性，并更加简短。

### 扩展性

我们为进阶用户提供了丰富的扩展API，我们采取分级形式的扩展API，不同级别的用户可以选择适合自己的API层级，在学习成本和扩展性之间找到一个平衡点。