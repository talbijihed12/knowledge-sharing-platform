import { RoleEnum } from 'src/app/shared/models/enums/role-enum';
import { RoutingModel } from 'src/app/shared/models/routing.model';

export const routingTable: RoutingModel[] = [
    {
        label: 'Create Post',
        routerLink:'/user/create-post',
        roles:[RoleEnum.ADMIN,RoleEnum.USER],
    },
    {
        label: 'Create Platefrome',
        routerLink:'/user/create-subplateforme',
        roles:[RoleEnum.ADMIN,RoleEnum.USER],
    },
    {
        label: 'List All Posts',
        routerLink:'/admin/list-posts',
        roles:[RoleEnum.ADMIN,RoleEnum.USER],
    },
    {
        label: 'List All Users',
        routerLink:'/admin/list-users',
        roles:[RoleEnum.ADMIN,RoleEnum.USER],
    }
];
