---
title: "使用 Linux + Incus 搭建 all in one 的小主机"
author: "六个骨头"
description: "目前最流行的 AIO 方案是 EXSI 和 PVE，但是其实还有一个更加轻量级的方案，只需要一个普通 Linux 的主机即可"
pubDatetime: "2024-10-13"
modDatetime: "2024-10-13"
tags: ["网络", "路由"]
---

前最流行的 AIO 方案是 EXSI 和 PVE，但是其实还有一个更加轻量级的方案，只需要一个普通 Linux 的主机即可。
EXSI 方案相对比较封闭，适合追求稳定的玩家，而 PVE 方案更加开放，深受开源发烧友的喜爱。
除了这两种主流的方案，还有 Hyper-V 等一些相对不太普适，仅适合特定的玩家的方案，当然，我现在的方案也是属于小众方案的一种，
即 Linux + Incus 方案。

## 目录

## 适合人群

1. 已经有一台 Linux 主机，并且想把他改造成 all in one 主机
2. 对 Linux 有一定了解，喜欢使用命令行
3. 喜欢开放的系统，或者喜欢特定的 Linux 发行版

可以参考上述的条件判断自己是否适合这套方案。

## 搭建方案
我的主机是一个 7505 的 6 网口机器，装了 8G 的内存，对于大部分需求来讲都够用了，其实完全没必要这么多网口。
操作系统是 ArchLinux，因为他的包管理相对用得比较顺手，但是理论上其他 Linux 发行版也都可以使用。

### 主要实例
目前我只运行了一个 VM 实例（iKuai），其他都是 LXD 的 ArchLinux 容器，相对更加轻量级，并且更加容易维护。

- iKuai：主路由，负责拨号上网，DHCP。
- ArchLinux 网关：负责 DNS 解析，透明代理。
- ArchLinux 服务：运行各种 docker 服务，例如 speedtest-tracker, alist 等
- HomeAssistant：智能家居系统，非官方系统，是基于 ArchLinux 搭建的。 

### 网口分配
因为网口比较充足，而且还在研究最优的方案，所以目前的分配还比较简陋。
只是将 enp2s0 (eth0) 直接分配给物理机，作为管理口备用，剩下的全部分配给了 iKuai，其中
enp3s0 (eth1)，enp4s0 (eth2)，enp5s0 (eth3) 分别作为 LAN 口，
enp6s0 (eth4)，enp7s0 (eth5) 作为 WAN 口。
<!-- TODO: 直通一些其他设备 -->

## 具体步骤
<!-- TODO: 增加一些介绍安装系统的文章 -->
首先，我们需要保证有一台可以使用的 Linux 主机，
我使用的是 ArchLinux，可以使用下面命令安装 [incus](https://github.com/lxc/incus)
```bash
sudo pacman -S --noconfirm --needed incus
```

如果你需要一个简单的 Web 管理界面，可以安装 [incus-ui-canonical](https://github.com/KosmX/incus-ui-canonical-arch)，
实际上这是一个 lxc-ui 套壳 ui，并不是专门为 incus 设计的，所以可能会有一些问题
```bash
paru -S --noconfirm --needed incus-ui-canonical
```

incus 的使用可以参考 [Incus 初见](https://silverl.me/posts/hello-incus/) 这个博文。
我这里只介绍一下搭建主机具体的一些操作。

### 搭建 iKuai 主路由

你可以按照下列步骤安装

```bash
wget https://www.ikuai8.com/download.php?n=/3.x/iso/iKuai8_x64_3.7.15_Build202409251708.iso -O iso-ikuai-volume.iso
incus storage volume import default ./iso-ikuai-volume.iso iso-ikuai-volume --type=iso

incus init ikuai --empty --vm -c security.secureboot=false
incus config device add ikuai iso-ikuai-volume disk pool=default source=iso-ikuai-volume boot.priority=1
```
上述代码中的下载地址可能不是最新的，你可以到 [iKuai官网](https://www.ikuai8.com/component/download) 找到最新的 ISO 链接替换。

上述步骤完成后，你可以在 incus-ui 上找到 ikuai 这个实例，点击启动，然后就可以看到 iKuai 的安装界面了，按照提示安装即可。

未完待续
