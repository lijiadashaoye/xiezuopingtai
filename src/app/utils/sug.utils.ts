import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser'

export const loadSvgResources = (ir: MdIconRegistry, ds: DomSanitizer) => {
    let imgDir = 'assets/img';
    let sidebarDir = `${imgDir}/sidebar`;
    let day = new Date().getDate();
    // 调用单个svg图标文件
    ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${imgDir}/days/day${day}.svg`));
    ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
    ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    // 调用svg集合
    ir.addSvgIconSetInNamespace('avatar', ds.bypassSecurityTrustResourceUrl(`${imgDir}/avatar/avatars.svg`));

    ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${imgDir}/icons/add.svg`));
    ir.addSvgIcon('burgerNav', ds.bypassSecurityTrustResourceUrl(`${imgDir}/icons/burger-navigation.svg`));
    ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${imgDir}/icons/delete.svg`));
    ir.addSvgIcon('hand', ds.bypassSecurityTrustResourceUrl(`${imgDir}/icons/hand-grab-o.svg`));
    ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${imgDir}/icons/move.svg`));

    ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${imgDir}/avatar/unassigned.svg`));
}